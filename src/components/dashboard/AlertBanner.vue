<script setup lang="ts">
import { onMounted } from 'vue'
import { AlertOctagon, AlertTriangle, Info, X } from 'lucide-vue-next'
import { useAlertStore } from '@/stores/alert'

const store = useAlertStore()

onMounted(() => {
  if (store.alerts.length === 0) {
    store.fetchAlerts()
  }
})

const severityConfig: Record<string, { icon: typeof AlertOctagon; bg: string; iconColor: string }> = {
  critical: { icon: AlertOctagon, bg: 'bg-[#7f1d1d]/50', iconColor: 'text-red-400' },
  warning: { icon: AlertTriangle, bg: 'bg-[#78350f]/50', iconColor: 'text-amber-400' },
  info: { icon: Info, bg: 'bg-[#1e3a5f]/50', iconColor: 'text-blue-400' },
}
</script>

<template>
  <Transition name="slide-down">
    <div
      v-if="store.activeAlerts.length > 0"
      class="rounded-xl overflow-hidden border border-slate-700/50"
    >
      <div class="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
        <div class="flex items-center gap-2">
          <AlertTriangle class="w-4 h-4 text-amber-400" />
          <span class="text-sm font-medium text-white">异常提醒</span>
          <span class="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
            {{ store.activeAlertsCount }}
          </span>
        </div>
        <button
          class="text-xs text-slate-400 hover:text-white transition-colors"
          @click="store.dismissAllAlerts()"
        >
          全部清除
        </button>
      </div>
      <div class="max-h-40 overflow-y-auto">
        <div
          v-for="alert in store.activeAlerts"
          :key="alert.id"
          :class="[severityConfig[alert.severity]?.bg, 'flex items-center gap-3 px-4 py-2.5 border-b border-slate-700/30 last:border-b-0']"
        >
          <component
            :is="severityConfig[alert.severity]?.icon ?? Info"
            :class="[severityConfig[alert.severity]?.iconColor, 'w-4 h-4 shrink-0']"
          />
          <span class="text-sm text-slate-200 flex-1 min-w-0 truncate">{{ alert.message }}</span>
          <button
            class="shrink-0 text-slate-500 hover:text-white transition-colors"
            @click="store.dismissAlert(alert.id)"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
