import { defineStore } from 'pinia'
import type {
  Application,
  ApprovalFlow,
  ApprovalNode,
  OperationRecord,
  RolePermission,
  Alert,
  StatsOverview,
  Applicant,
} from '@/types'
import { applications as mockApplications, flows as mockFlows, records as mockRecords, roles as mockRoles, stats as mockStats } from '@/mock'
import { useAuthStore } from './auth'

export const useApplicationStore = defineStore('application', {
  state: () => ({
    applications: [] as Application[],
    currentApplication: null as Application | null,
    currentFlow: null as ApprovalFlow | null,
    currentRecords: [] as OperationRecord[],
    currentPermissions: [] as RolePermission[],
    selectedNodeId: null as string | null,
    stats: null as StatsOverview | null,
    filterStatus: '' as string,
    filterType: '' as string,
    filterDepartment: '' as string,
    searchQuery: '' as string,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    loading: false,
  }),

  getters: {
    filteredApplications(state): Application[] {
      let result = [...state.applications]
      if (state.filterStatus) {
        result = result.filter(app => app.status === state.filterStatus)
      }
      if (state.filterType) {
        result = result.filter(app => app.type === state.filterType)
      }
      if (state.filterDepartment) {
        result = result.filter(app => app.department === state.filterDepartment)
      }
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        result = result.filter(
          app =>
            app.title.toLowerCase().includes(query) ||
            app.applicant.name.toLowerCase().includes(query) ||
            app.id.toLowerCase().includes(query),
        )
      }
      return result
    },

    paginatedApplications(): Application[] {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredApplications.slice(start, end)
    },

    totalPages(): number {
      return Math.ceil(this.filteredApplications.length / this.pageSize)
    },

    currentNode(state): ApprovalNode | null {
      if (!state.currentFlow) return null
      return state.currentFlow.nodes.find(n => n.status === 'current') ?? null
    },

    selectedNode(state): ApprovalNode | null {
      if (!state.selectedNodeId || !state.currentFlow) return null
      return state.currentFlow.nodes.find(n => n.id === state.selectedNodeId) ?? null
    },

    selectedNodeRecords(state): OperationRecord[] {
      if (!state.selectedNodeId) return []
      return state.currentRecords.filter(r => r.nodeId === state.selectedNodeId)
    },

    selectedNodePermissions(): RolePermission[] {
      if (!this.selectedNodeId || !this.currentFlow) return []
      const node = this.currentFlow.nodes.find(n => n.id === this.selectedNodeId)
      if (!node) return []
      return mockRoles.filter(p => node.requiredRoles.includes(p.roleId))
    },
  },

  actions: {
    fetchApplications() {
      this.loading = true
      try {
        this.applications = mockApplications.map(a => ({ ...a }))
        this.total = this.filteredApplications.length
      } finally {
        this.loading = false
      }
    },

    fetchApplicationDetail(id: string) {
      this.loading = true
      try {
        const app = mockApplications.find(a => a.id === id)
        if (app) {
          this.currentApplication = { ...app }
        } else {
          this.currentApplication = null
        }

        const flow = mockFlows.find(f => f.applicationId === id)
        if (flow) {
          this.currentFlow = JSON.parse(JSON.stringify(flow))
        } else {
          this.currentFlow = null
        }

        this.currentRecords = mockRecords
          .filter(r => r.applicationId === id)
          .map(r => ({ ...r, operator: { ...r.operator } }))

        this.currentPermissions = [...mockRoles]

        const currentNode = this.currentFlow?.nodes.find(n => n.status === 'current')
        this.selectedNodeId = currentNode?.id ?? null
      } finally {
        this.loading = false
      }
    },

    selectNode(nodeId: string | null) {
      this.selectedNodeId = nodeId
    },

    checkPermission(nodeId: string): boolean {
      const authStore = useAuthStore()
      if (!this.currentFlow) return false
      const node = this.currentFlow.nodes.find(n => n.id === nodeId)
      if (!node) return false
      if (node.status !== 'current') return false
      const rolePermission = mockRoles.find(p => p.roleId === authStore.currentUser.role)
      if (!rolePermission) return false
      return node.requiredRoles.includes(authStore.currentUser.role)
    },

    getMissingApproverAlert(nodeId: string): Alert | null {
      if (!this.currentFlow) return null
      const node = this.currentFlow.nodes.find(n => n.id === nodeId)
      if (!node) return null
      if (!node.assignee) {
        return {
          id: `alert_missing_${nodeId}`,
          type: 'missing_approver',
          severity: 'warning',
          message: `节点"${node.name}"未指定审批人，请尽快分配`,
          applicationId: this.currentApplication?.id ?? '',
          nodeId,
          createdAt: new Date().toISOString(),
          dismissed: false,
        }
      }
      return null
    },

    getEmptyRecordAlert(nodeId: string): Alert | null {
      const nodeRecords = this.currentRecords.filter(r => r.nodeId === nodeId)
      if (nodeRecords.length === 0 && this.currentFlow) {
        const node = this.currentFlow.nodes.find(n => n.id === nodeId)
        if (node && (node.status === 'approved' || node.status === 'rejected')) {
          return {
            id: `alert_empty_${nodeId}`,
            type: 'empty_record',
            severity: 'info',
            message: `节点"${node.name}"已处理但无操作记录`,
            applicationId: this.currentApplication?.id ?? '',
            nodeId,
            createdAt: new Date().toISOString(),
            dismissed: false,
          }
        }
      }
      return null
    },

    approveApplication(id: string, remark: string): { success: boolean; reason?: string } {
      const authStore = useAuthStore()

      if (!this.currentFlow) {
        return { success: false, reason: '未找到审批流程' }
      }

      const currentNode = this.currentFlow.nodes.find(n => n.status === 'current')
      if (!currentNode) {
        return { success: false, reason: '未找到当前审批节点' }
      }

      if (!this.checkPermission(currentNode.id)) {
        return { success: false, reason: '您没有权限操作此节点' }
      }

      const missingAlert = this.getMissingApproverAlert(currentNode.id)
      if (missingAlert) {
        return { success: false, reason: '当前节点缺少审批人，无法操作' }
      }

      currentNode.status = 'approved'
      currentNode.remark = remark
      currentNode.operatedAt = new Date().toISOString()

      const operator: Applicant = {
        id: authStore.currentUser.id,
        name: authStore.currentUser.name,
        department: authStore.currentUser.department,
        role: authStore.currentUser.role,
      }

      const newRecord: OperationRecord = {
        id: `rec_${Date.now()}`,
        applicationId: id,
        nodeId: currentNode.id,
        operator,
        action: 'approve',
        remark,
        operatedAt: new Date().toISOString(),
      }
      this.currentRecords.push(newRecord)

      const nextNode = this.currentFlow.nodes.find(
        n => n.order > currentNode.order && n.status === 'pending',
      )
      if (nextNode) {
        nextNode.status = 'current'
      } else {
        if (this.currentApplication) {
          this.currentApplication.status = 'approved'
        }
        const appIndex = this.applications.findIndex(a => a.id === id)
        if (appIndex !== -1) {
          this.applications[appIndex].status = 'approved'
        }
      }

      const appIndex = this.applications.findIndex(a => a.id === id)
      if (appIndex !== -1) {
        this.applications[appIndex].updatedAt = new Date().toISOString()
      }

      return { success: true }
    },

    rejectApplication(id: string, remark: string): { success: boolean; reason?: string } {
      const authStore = useAuthStore()

      if (!this.currentFlow) {
        return { success: false, reason: '未找到审批流程' }
      }

      const currentNode = this.currentFlow.nodes.find(n => n.status === 'current')
      if (!currentNode) {
        return { success: false, reason: '未找到当前审批节点' }
      }

      if (!this.checkPermission(currentNode.id)) {
        return { success: false, reason: '您没有权限操作此节点' }
      }

      currentNode.status = 'rejected'
      currentNode.remark = remark
      currentNode.operatedAt = new Date().toISOString()

      const operator: Applicant = {
        id: authStore.currentUser.id,
        name: authStore.currentUser.name,
        department: authStore.currentUser.department,
        role: authStore.currentUser.role,
      }

      const newRecord: OperationRecord = {
        id: `rec_${Date.now()}`,
        applicationId: id,
        nodeId: currentNode.id,
        operator,
        action: 'reject',
        remark,
        operatedAt: new Date().toISOString(),
      }
      this.currentRecords.push(newRecord)

      for (const node of this.currentFlow.nodes) {
        if (node.status === 'pending' || node.status === 'current') {
          node.status = 'skipped'
        }
      }

      if (this.currentApplication) {
        this.currentApplication.status = 'rejected'
      }

      const appIndex = this.applications.findIndex(a => a.id === id)
      if (appIndex !== -1) {
        this.applications[appIndex].status = 'rejected'
        this.applications[appIndex].updatedAt = new Date().toISOString()
      }

      return { success: true }
    },

    transferApplication(id: string, targetUser: string, remark: string): { success: boolean; reason?: string } {
      const authStore = useAuthStore()

      if (!this.currentFlow) {
        return { success: false, reason: '未找到审批流程' }
      }

      const currentNode = this.currentFlow.nodes.find(n => n.status === 'current')
      if (!currentNode) {
        return { success: false, reason: '未找到当前审批节点' }
      }

      if (!this.checkPermission(currentNode.id)) {
        return { success: false, reason: '您没有权限操作此节点' }
      }

      const rolePermission = mockRoles.find(p => p.roleId === authStore.currentUser.role)
      if (!rolePermission || !rolePermission.canTransfer) {
        return { success: false, reason: '您没有转交权限' }
      }

      currentNode.remark = `转交给${targetUser}处理`
      currentNode.operatedAt = new Date().toISOString()

      const operator: Applicant = {
        id: authStore.currentUser.id,
        name: authStore.currentUser.name,
        department: authStore.currentUser.department,
        role: authStore.currentUser.role,
      }

      const newRecord: OperationRecord = {
        id: `rec_${Date.now()}`,
        applicationId: id,
        nodeId: currentNode.id,
        operator,
        action: 'transfer',
        remark: `转交给${targetUser}处理。${remark}`,
        operatedAt: new Date().toISOString(),
      }
      this.currentRecords.push(newRecord)

      const appIndex = this.applications.findIndex(a => a.id === id)
      if (appIndex !== -1) {
        this.applications[appIndex].updatedAt = new Date().toISOString()
      }

      return { success: true }
    },

    fetchStats() {
      this.stats = { ...mockStats }
    },

    setFilterStatus(status: string) {
      this.filterStatus = status
      this.currentPage = 1
    },

    setFilterType(type: string) {
      this.filterType = type
      this.currentPage = 1
    },

    setFilterDepartment(department: string) {
      this.filterDepartment = department
      this.currentPage = 1
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
      this.currentPage = 1
    },

    setPage(page: number) {
      this.currentPage = page
    },

    resetFilters() {
      this.filterStatus = ''
      this.filterType = ''
      this.filterDepartment = ''
      this.searchQuery = ''
      this.currentPage = 1
    },
  },
})
