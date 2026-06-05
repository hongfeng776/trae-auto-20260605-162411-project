<script setup lang="ts">
import { onMounted } from 'vue'
import { Clock, CheckCircle, AlertTriangle, Send, TrendingUp, TrendingDown } from 'lucide-vue-next'
import { useApplicationStore } from '@/stores/application'

const store = useApplicationStore()

onMounted(() => {
  if (!store.stats) {
    store.fetchStats()
  }
})

const cards = [
  {
    key: 'pending',
    label: '待审批',
    countKey: 'pendingCount' as const,
    trendKey: 'pendingTrend' as const,
    icon: Clock,
    color: 'amber',
    bgColor: 'bg-amber-500/20',
    textColor: 'text-amber-400',
    filterValue: 'pending',
  },
  {
    key: 'approved',
    label: '已审批',
    countKey: 'approvedCount' as const,
    trendKey: 'approvedTrend' as const,
    icon: CheckCircle,
    color: 'green',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-400',
    filterValue: 'approved',
  },
  {
    key: 'exception',
    label: '异常数',
    countKey: 'exceptionCount' as const,
    trendKey: 'exceptionTrend' as const,
    icon: AlertTriangle,
    color: 'red',
    bgColor: 'bg-red-500/20',
    textColor: 'text-red-400',
    filterValue: '',
  },
  {
    key: 'today',
    label: '今日提交',
    countKey: 'todaySubmitted' as const,
    trendKey: 'todayTrend' as const,
    icon: Send,
    color: 'blue',
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-400',
    filterValue: '',
  },
]

function handleClick(filterValue: string) {
  if (filterValue) {
    store.setFilterStatus(filterValue)
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
    <div
      v-for="card in cards"
      :key="card.key"
      class="bg-[#1e293b] rounded-xl p-5 hover:shadow-lg transition-shadow cursor-pointer"
      @click="handleClick(card.filterValue)"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div :class="[card.bgColor, 'w-12 h-12 rounded-full flex items-center justify-center']">
            <component :is="card.icon" :class="[card.textColor, 'w-6 h-6']" />
          </div>
          <div>
            <div class="text-2xl font-bold text-white font-['JetBrains_Mono',monospace]">
              {{ store.stats?.[card.countKey] ?? 0 }}
            </div>
            <div class="text-sm text-slate-400 mt-0.5">{{ card.label }}</div>
          </div>
        </div>
        <div class="flex items-center gap-1 text-sm">
          <TrendingUp v-if="(store.stats?.[card.trendKey] ?? 0) >= 0" class="w-4 h-4 text-green-400" />
          <TrendingDown v-else class="w-4 h-4 text-red-400" />
          <span :class="(store.stats?.[card.trendKey] ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'">
            {{ Math.abs(store.stats?.[card.trendKey] ?? 0) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
