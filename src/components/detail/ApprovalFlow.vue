<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, XCircle, Play, Clock, SkipForward } from 'lucide-vue-next'
import { useApplicationStore } from '@/stores/application'

const store = useApplicationStore()

const nodes = computed(() => store.currentFlow?.nodes ?? [])

const statusIconMap: Record<string, typeof CheckCircle> = {
  approved: CheckCircle,
  rejected: XCircle,
  current: Play,
  pending: Clock,
  skipped: SkipForward,
}

const statusColorMap: Record<string, string> = {
  approved: 'text-emerald-500',
  rejected: 'text-red-500',
  current: 'text-amber-500',
  pending: 'text-slate-400',
  skipped: 'text-slate-500',
}

const statusBgMap: Record<string, string> = {
  approved: 'bg-emerald-500/20 border-emerald-500/40',
  rejected: 'bg-red-500/20 border-red-500/40',
  current: 'bg-amber-500/20 border-amber-500',
  pending: 'bg-slate-600/30 border-slate-600/40',
  skipped: 'bg-slate-600/30 border-slate-600/40',
}

const typeLabelMap: Record<string, string> = {
  submit: '提交',
  department_approve: '部门审批',
  finance_approve: '财务审批',
  admin_approve: '行政审批',
  complete: '流程结束',
}

function formatTime(iso: string) {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
</script>

<template>
  <div v-if="nodes.length === 0" class="text-center py-12 text-slate-500">
    暂无审批流程数据
  </div>

  <div v-else class="flex flex-col">
    <div
      v-for="(node, index) in nodes"
      :key="node.id"
      class="flex cursor-pointer group"
      @click="store.selectNode(node.id)"
    >
      <div class="flex flex-col items-center mr-4">
        <div
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all',
            statusBgMap[node.status],
            node.status === 'current' ? 'animate-pulse-ring' : '',
            store.selectedNodeId === node.id ? 'ring-2 ring-amber-500/50 ring-offset-2 ring-offset-slate-900' : '',
          ]"
        >
          <component
            :is="statusIconMap[node.status]"
            :class="['w-5 h-5', statusColorMap[node.status]]"
          />
        </div>
        <div
          v-if="index < nodes.length - 1"
          class="w-0.5 flex-1 bg-slate-700 my-1"
        />
      </div>

      <div
        :class="[
          'flex-1 pb-6 rounded-lg transition-all',
          store.selectedNodeId === node.id
            ? 'border-l-2 border-amber-500 bg-amber-500/5 pl-4'
            : 'border-l-2 border-transparent pl-4 group-hover:bg-slate-800/50',
        ]"
      >
        <div class="flex items-center gap-2 mb-1 flex-wrap">
          <span class="text-sm font-medium text-slate-200">{{ node.name }}</span>
          <span class="text-xs px-2 py-0.5 rounded bg-slate-700/70 text-slate-400">
            {{ typeLabelMap[node.type] ?? node.type }}
          </span>
          <span
            v-if="node.status === 'current'"
            class="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400"
          >
            当前节点
          </span>
        </div>

        <div v-if="node.assignee" class="text-sm text-slate-400 mb-1">
          {{ node.assignee.name }}
          <span class="text-slate-500">· {{ node.assignee.department }}</span>
        </div>
        <div v-else class="text-sm text-yellow-400 mb-1">
          ⚠ 未指定审批人
        </div>

        <div v-if="node.operatedAt" class="text-xs text-slate-500 mb-1">
          {{ formatTime(node.operatedAt) }}
        </div>

        <div v-if="node.remark" class="text-xs text-slate-400 italic">
          {{ node.remark }}
        </div>
      </div>
    </div>
  </div>
</template>
