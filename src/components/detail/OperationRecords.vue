<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  CheckCircle,
  XCircle,
  ArrowRightLeft,
  Send,
  RotateCcw,
  UserPlus,
  AlertCircle,
} from 'lucide-vue-next'
import { useApplicationStore } from '@/stores/application'
import type { OperationRecord } from '@/types'

const store = useApplicationStore()

const roleNameMap: Record<string, string> = {
  super_admin: '超级管理员',
  department_approver: '部门审批人',
  finance_approver: '财务审批人',
  applicant: '普通申请人',
}

const selectedNode = computed(() => store.selectedNode)
const records = computed(() => store.selectedNodeRecords)

const transitionKey = ref(0)
watch(() => store.selectedNodeId, () => {
  transitionKey.value++
})

const showEmptyWarning = computed(() => {
  const node = selectedNode.value
  if (!node) return false
  if (records.value.length > 0) return false
  return node.status === 'approved' || node.status === 'rejected' || node.status === 'skipped'
})

const showPendingHint = computed(() => {
  const node = selectedNode.value
  if (!node) return false
  return records.value.length === 0 && node.status === 'pending'
})

const showCurrentHint = computed(() => {
  const node = selectedNode.value
  if (!node) return false
  return records.value.length === 0 && node.status === 'current'
})

const actionIconMap: Record<string, typeof CheckCircle> = {
  approve: CheckCircle,
  reject: XCircle,
  transfer: ArrowRightLeft,
  submit: Send,
  withdraw: RotateCcw,
  add_approver: UserPlus,
}

const actionColorMap: Record<string, string> = {
  approve: 'text-emerald-500',
  reject: 'text-red-500',
  transfer: 'text-blue-500',
  submit: 'text-slate-400',
  withdraw: 'text-slate-400',
  add_approver: 'text-purple-500',
}

const actionBgMap: Record<string, string> = {
  approve: 'bg-emerald-500/15',
  reject: 'bg-red-500/15',
  transfer: 'bg-blue-500/15',
  submit: 'bg-slate-600/30',
  withdraw: 'bg-slate-600/30',
  add_approver: 'bg-purple-500/15',
}

const actionTextMap: Record<string, string> = {
  approve: '通过',
  reject: '驳回',
  transfer: '转交',
  submit: '提交',
  withdraw: '撤回',
  add_approver: '加签',
}

function formatTime(iso: string) {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function operatorRoleName(record: OperationRecord) {
  return roleNameMap[record.operator.role] ?? record.operator.role
}
</script>

<template>
  <div class="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
    <div class="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
      <h3 class="text-sm font-semibold text-slate-200 flex items-center gap-2">
        操作记录
        <template v-if="selectedNode">
          <span class="text-slate-400 font-normal">— {{ selectedNode.name }}</span>
          <span class="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">
            {{ records.length }} 条
          </span>
        </template>
      </h3>
      <div v-if="selectedNode" class="flex items-center gap-2">
        <span
          class="text-xs px-2 py-0.5 rounded-full"
          :class="{
            'bg-emerald-500/15 text-emerald-400': selectedNode.status === 'approved',
            'bg-red-500/15 text-red-400': selectedNode.status === 'rejected',
            'bg-amber-500/15 text-amber-400': selectedNode.status === 'current',
            'bg-slate-600/30 text-slate-400': selectedNode.status === 'pending',
            'bg-slate-700/50 text-slate-500': selectedNode.status === 'skipped',
          }"
        >
          {{ { approved: '已通过', rejected: '已驳回', current: '处理中', pending: '待处理', skipped: '已跳过' }[selectedNode.status] }}
        </span>
      </div>
    </div>

    <div v-if="!selectedNode" class="py-12 text-center text-slate-500">
      请选择审批节点查看操作记录
    </div>

    <div v-else-if="showEmptyWarning" class="py-10 px-5">
      <div class="flex flex-col items-center gap-3 p-6 border border-amber-500/30 rounded-lg bg-amber-500/5">
        <AlertCircle class="w-10 h-10 text-amber-500" />
        <p class="text-sm text-slate-300 font-medium">此节点暂无操作记录</p>
        <p class="text-xs text-slate-500">节点已处理但记录缺失，请核实</p>
        <span class="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
          记录为空
        </span>
      </div>
    </div>

    <div v-else-if="showPendingHint" class="py-10 px-5">
      <div class="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-700/20">
        <Clock class="w-8 h-8 text-slate-500" />
        <p class="text-sm text-slate-400">此节点待处理，尚无操作记录</p>
      </div>
    </div>

    <div v-else-if="showCurrentHint" class="py-10 px-5">
      <div class="flex flex-col items-center gap-3 p-6 rounded-lg bg-amber-500/5 border border-amber-500/20">
        <Clock class="w-8 h-8 text-amber-500 animate-pulse" />
        <p class="text-sm text-amber-300">此节点正在审批中，等待操作</p>
        <p class="text-xs text-slate-500">审批人：{{ selectedNode.assignee?.name ?? '未指定' }}</p>
      </div>
    </div>

    <div v-else-if="records.length === 0" class="py-8 text-center text-slate-500">
      暂无操作记录
    </div>

    <div v-else class="p-5 space-y-0">
      <TransitionGroup name="record-list" tag="div" class="space-y-0">
        <div
          v-for="(record, index) in records"
          :key="record.id"
          class="flex gap-3"
        >
          <div class="flex flex-col items-center">
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                actionBgMap[record.action],
              ]"
            >
              <component
                :is="actionIconMap[record.action]"
                :class="['w-4 h-4', actionColorMap[record.action]]"
              />
            </div>
            <div
              v-if="index < records.length - 1"
              class="w-0.5 flex-1 bg-slate-700 my-1"
            />
          </div>

          <div class="flex-1 pb-4">
            <div class="flex items-center gap-2 mb-0.5">
              <span class="text-sm font-medium text-slate-200">{{ record.operator.name }}</span>
              <span class="text-xs text-slate-500">{{ operatorRoleName(record) }}</span>
              <span
                :class="[
                  'text-xs font-medium px-1.5 py-0.5 rounded',
                  actionColorMap[record.action],
                  actionBgMap[record.action],
                ]"
              >
                {{ actionTextMap[record.action] }}
              </span>
            </div>

            <div class="text-xs text-slate-500 mb-1">
              {{ formatTime(record.operatedAt) }}
            </div>

            <div v-if="record.remark" class="text-xs text-slate-400 italic mt-1">
              {{ record.remark }}
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { Clock } from 'lucide-vue-next'
</script>

<style scoped>
.record-list-enter-active {
  transition: all 0.3s ease-out;
}
.record-list-leave-active {
  transition: all 0.2s ease-in;
}
.record-list-enter-from {
  opacity: 0;
  transform: translateX(-12px);
}
.record-list-leave-to {
  opacity: 0;
  transform: translateX(12px);
}
</style>
