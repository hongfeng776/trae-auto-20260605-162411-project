<script setup lang="ts">
import { onMounted } from 'vue'
import { Clock, CheckCircle, AlertTriangle, Send, UserCheck, TrendingUp, TrendingDown } from 'lucide-vue-next'
import { useApplicationStore } from '@/stores/application'
import { useAuthStore } from '@/stores/auth'

const store = useApplicationStore()
const authStore = useAuthStore()

onMounted(() => {
  if (!store.stats) {
    store.fetchStats()
  }
  if (store.applications.length === 0) {
    store.fetchApplications()
  }
})

const roleNameMap: Record<string, string> = {
  super_admin: '超级管理员',
  department_approver: '部门审批人',
  finance_approver: '财务审批人',
  applicant: '申请人',
}

const cards = [
  {
    key: 'pending',
    label: '待审批',
    countKey: 'pendingCount' as const,
    trendKey: 'pendingTrend' as const,
    icon: Clock,
    bgColor: 'bg-amber-500/20',
    textColor: 'text-amber-400',
    filterStatus: 'pending',
    filterRole: '',
  },
  {
    key: 'approved',
    label: '已审批',
    countKey: 'approvedCount' as const,
    trendKey: 'approvedTrend' as const,
    icon: CheckCircle,
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-400',
    filterStatus: 'approved',
    filterRole: '',
  },
  {
    key: 'exception',
    label: '异常数',
    countKey: 'exceptionCount' as const,
    trendKey: 'exceptionTrend' as const,
    icon: AlertTriangle,
    bgColor: 'bg-red-500/20',
    textColor: 'text-red-400',
    filterStatus: '',
    filterRole: '',
  },
  {
    key: 'today',
    label: '今日提交',
    countKey: 'todaySubmitted' as const,
    trendKey: 'todayTrend' as const,
    icon: Send,
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-400',
    filterStatus: '',
    filterRole: '',
  },
  {
    key: 'myPending',
    label: '待我审批',
    countKey: null,
    trendKey: null,
    icon: UserCheck,
    bgColor: 'bg-violet-500/20',
    textColor: 'text-violet-400',
    filterStatus: 'pending',
    filterRole: authStore.currentUser.role,
    dynamic: true,
  },
]

function handleClick(card: typeof cards[number]) {
  store.setFilterStatus(card.filterStatus)
  store.setFilterRole(card.filterRole)
  store.setFilterType('')
  store.setFilterDepartment('')
  store.setSearchQuery('')
}
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
    <div
      v-for="card in cards"
      :key="card.key"
      class="bg-[#1e293b] rounded-xl p-5 hover:shadow-lg transition-shadow cursor-pointer"
      @click="handleClick(card)"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div :class="[card.bgColor, 'w-12 h-12 rounded-full flex items-center justify-center']">
            <component :is="card.icon" :class="[card.textColor, 'w-6 h-6']" />
          </div>
          <div>
            <div v-if="card.dynamic" class="text-2xl font-bold text-white font-['JetBrains_Mono',monospace]">
              {{ store.myPendingCount }}
            </div>
            <div v-else class="text-2xl font-bold text-white font-['JetBrains_Mono',monospace]">
              {{ store.stats?.[card.countKey!] ?? 0 }}
            </div>
            <div class="text-sm text-slate-400 mt-0.5">
              {{ card.key === 'myPending' ? `待${roleNameMap[authStore.currentUser.role] ?? ''}审批` : card.label }}
            </div>
          </div>
        </div>
        <div v-if="!card.dynamic && card.trendKey" class="flex items-center gap-1 text-sm">
          <TrendingUp v-if="(store.stats?.[card.trendKey!] ?? 0) >= 0" class="w-4 h-4 text-green-400" />
          <TrendingDown v-else class="w-4 h-4 text-red-400" />
          <span :class="(store.stats?.[card.trendKey!] ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'">
            {{ Math.abs(store.stats?.[card.trendKey!] ?? 0) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
