import { defineStore } from 'pinia'
import type { CurrentUser } from '@/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: {
      id: 'u001',
      name: '张明远',
      role: 'super_admin',
      department: '技术部',
    } as CurrentUser,
    availableRoles: [
      { id: 'u001', name: '张明远', role: 'super_admin', department: '技术部' },
      { id: 'u002', name: '李晓燕', role: 'department_approver', department: '市场部' },
      { id: 'u003', name: '王财务', role: 'finance_approver', department: '财务部' },
      { id: 'u004', name: '赵申请人', role: 'applicant', department: '运营部' },
    ] as CurrentUser[],
  }),
  actions: {
    switchRole(userId: string) {
      const user = this.availableRoles.find(u => u.id === userId)
      if (user) {
        this.currentUser = { ...user }
      }
    },
  },
  getters: {
    isSuperAdmin: (state) => state.currentUser.role === 'super_admin',
    isDepartmentApprover: (state) => state.currentUser.role === 'department_approver',
    isFinanceApprover: (state) => state.currentUser.role === 'finance_approver',
    isApplicant: (state) => state.currentUser.role === 'applicant',
  },
})
