<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import ApprovalFlow from '@/components/detail/ApprovalFlow.vue'
import RolePermissions from '@/components/detail/RolePermissions.vue'
import OperationRecords from '@/components/detail/OperationRecords.vue'
import ApprovalActions from '@/components/detail/ApprovalActions.vue'
import { useApplicationStore } from '@/stores/application'
import { useAlertStore } from '@/stores/alert'
import { ArrowLeft, FileText, User, Building2, Calendar, DollarSign, ChevronRight, Eye } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const appStore = useApplicationStore()
const alertStore = useAlertStore()

const typeIdMap: Record<string, string> = {
  leave: '请假', expense: '报销', purchase: '采购', overtime: '加班', transfer: '调岗',
}
const statusIdMap: Record<string, string> = {
  pending: '待审批', processing: '审批中', approved: '已通过', rejected: '已驳回', cancelled: '已取消',
}
const statusColorMap: Record<string, string> = {
  pending: 'bg-amber-500/20 text-amber-400',
  processing: 'bg-blue-500/20 text-blue-400',
  approved: 'bg-emerald-500/20 text-emerald-400',
  rejected: 'bg-red-500/20 text-red-400',
  cancelled: 'bg-slate-500/20 text-slate-400',
}

const appAlerts = computed(() => {
  if (!appStore.currentApplication) return []
  return alertStore.getAlertsByApplicationId(appStore.currentApplication.id).filter(a => !a.dismissed)
})

const selectedNode = computed(() => appStore.selectedNode)
const currentNode = computed(() => appStore.currentNode)

function goBack() {
  router.push('/')
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function selectNodeById(nodeId: string) {
  appStore.selectNode(nodeId)
}

onMounted(() => {
  const id = route.params.id as string
  if (id) {
    appStore.fetchApplicationDetail(id)
  }
})

onUnmounted(() => {
  appStore.selectNode(null)
})
</script>

<template>
  <AppLayout>
    <div class="min-h-screen pb-24 animate-fade-in">
      <div class="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div class="p-4 flex items-center gap-4">
          <button
            class="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            @click="goBack"
          >
            <ArrowLeft class="w-5 h-5" />
          </button>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h1 class="text-lg font-semibold text-slate-100 truncate">
                {{ appStore.currentApplication?.title ?? '加载中...' }}
              </h1>
              <span
                v-if="appStore.currentApplication"
                class="px-2 py-0.5 rounded text-xs font-medium"
                :class="statusColorMap[appStore.currentApplication.status]"
              >
                {{ statusIdMap[appStore.currentApplication?.status ?? ''] }}
              </span>
            </div>
            <p class="text-sm text-slate-400 mt-0.5">
              {{ appStore.currentApplication?.id ?? '' }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="appAlerts.length > 0"
        class="mx-6 mt-4 space-y-2 animate-slide-down"
        role="alert"
      >
        <div
          v-for="alert in appAlerts"
          :key="alert.id"
          class="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm"
          :class="{
            'bg-red-900/40 text-red-300 border border-red-800/50': alert.severity === 'critical',
            'bg-amber-900/40 text-amber-300 border border-amber-800/50': alert.severity === 'warning',
            'bg-blue-900/40 text-blue-300 border border-blue-800/50': alert.severity === 'info',
          }"
        >
          <span class="shrink-0">
            {{ alert.severity === 'critical' ? '🔴' : alert.severity === 'warning' ? '🟡' : '🔵' }}
          </span>
          <span>{{ alert.message }}</span>
        </div>
      </div>

      <div
        v-if="appStore.currentApplication"
        class="p-6 space-y-6"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
            <h3 class="text-sm font-medium text-slate-400 mb-3">申请信息</h3>
            <div class="space-y-2.5">
              <div class="flex items-center gap-2 text-sm">
                <FileText class="w-4 h-4 text-slate-500 shrink-0" />
                <span class="text-slate-400">类型：</span>
                <span class="text-slate-200">{{ typeIdMap[appStore.currentApplication.type] }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <User class="w-4 h-4 text-slate-500 shrink-0" />
                <span class="text-slate-400">申请人：</span>
                <span class="text-slate-200">{{ appStore.currentApplication.applicant.name }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <Building2 class="w-4 h-4 text-slate-500 shrink-0" />
                <span class="text-slate-400">部门：</span>
                <span class="text-slate-200">{{ appStore.currentApplication.department }}</span>
              </div>
              <div v-if="appStore.currentApplication.amount" class="flex items-center gap-2 text-sm">
                <DollarSign class="w-4 h-4 text-slate-500 shrink-0" />
                <span class="text-slate-400">金额：</span>
                <span class="text-accent font-mono-data">¥{{ appStore.currentApplication.amount.toLocaleString() }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <Calendar class="w-4 h-4 text-slate-500 shrink-0" />
                <span class="text-slate-400">提交时间：</span>
                <span class="text-slate-200">{{ formatDate(appStore.currentApplication.createdAt) }}</span>
              </div>
            </div>
          </div>

          <div class="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-medium text-slate-400">流程进度</h3>
              <div v-if="selectedNode" class="flex items-center gap-1.5 text-xs text-amber-400">
                <Eye class="w-3 h-3" />
                <span>查看：{{ selectedNode.name }}</span>
              </div>
            </div>
            <div v-if="appStore.currentFlow" class="flex items-center gap-1 flex-wrap">
              <template v-for="(node, i) in appStore.currentFlow.nodes" :key="node.id">
                <div
                  class="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium cursor-pointer transition-all"
                  :class="{
                    'bg-emerald-500/20 text-emerald-400': node.status === 'approved',
                    'bg-red-500/20 text-red-400': node.status === 'rejected',
                    'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50': node.status === 'current',
                    'bg-slate-700/50 text-slate-500': node.status === 'pending',
                    'bg-slate-800/50 text-slate-600 line-through': node.status === 'skipped',
                    'ring-2 ring-accent ring-offset-1 ring-offset-slate-800 scale-105': node.id === appStore.selectedNodeId,
                  }"
                  @click="selectNodeById(node.id)"
                >
                  {{ node.name }}
                </div>
                <ChevronRight v-if="i < appStore.currentFlow.nodes.length - 1" class="w-3 h-3 text-slate-600" />
              </template>
            </div>
            <p v-if="selectedNode && currentNode && selectedNode.id !== currentNode.id" class="mt-2 text-xs text-blue-400/80">
              💡 点击节点查看详情，审批操作仅作用于当前节点「{{ currentNode.name }}」
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div class="xl:col-span-1">
            <ApprovalFlow />
          </div>
          <div class="xl:col-span-2 space-y-6">
            <RolePermissions />
            <OperationRecords />
          </div>
        </div>
      </div>

      <div v-else class="flex items-center justify-center h-96">
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
            <FileText class="w-6 h-6 text-slate-500" />
          </div>
          <p class="text-slate-400">加载申请详情...</p>
        </div>
      </div>

      <ApprovalActions />
    </div>
  </AppLayout>
</template>
