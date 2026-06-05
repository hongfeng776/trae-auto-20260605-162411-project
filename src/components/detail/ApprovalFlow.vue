<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, XCircle, Play, Clock, SkipForward, User, FileText, ChevronRight } from 'lucide-vue-next'
import { useApplicationStore } from '@/stores/application'

const store = useApplicationStore()

const nodes = computed(() => store.currentFlow?.nodes ?? [])

const roleNameMap: Record<string, string> = {
  super_admin: '超级管理员',
  department_approver: '部门审批人',
  finance_approver: '财务审批人',
  applicant: '普通申请人',
}

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

function getNodeRecordCount(nodeId: string): number {
  return store.currentRecords.filter(r => r.nodeId === nodeId).length
}

function getNodeRequiredRoles(nodeId: string): string {
  const node = store.currentFlow?.nodes.find(n => n.id === nodeId)
  if (!node) return ''
  return node.requiredRoles.map(r => roleNameMap[r] ?? r).join('、')
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

  <div v-else class="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
    <div class="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
      <h3 class="text-sm font-semibold text-slate-200">审批流程</h3>
      <span class="text-xs text-slate-500">{{ nodes.length }} 个节点</span>
    </div>

    <div class="p-5 flex flex-col">
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
              store.selectedNodeId === node.id ? 'ring-2 ring-amber-500/50 ring-offset-2 ring-offset-slate-800' : '',
            ]"
          >
            <component
              :is="statusIconMap[node.status]"
              :class="['w-5 h-5', statusColorMap[node.status]]"
            />
          </div>
          <div
            v-if="index < nodes.length - 1"
            class="w-0.5 flex-1 my-1 transition-colors"
            :class="{
              'bg-emerald-500/40': node.status === 'approved',
              'bg-red-500/40': node.status === 'rejected',
              'bg-amber-500/40': node.status === 'current',
              'bg-slate-700': node.status === 'pending' || node.status === 'skipped',
            }"
          />
        </div>

        <div
          :class="[
            'flex-1 pb-5 rounded-lg transition-all',
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

          <div class="flex items-center gap-3 mb-1.5 flex-wrap">
            <div v-if="node.assignee" class="flex items-center gap-1 text-sm text-slate-400">
              <User class="w-3.5 h-3.5" />
              <span>{{ node.assignee.name }}</span>
              <span class="text-slate-500">· {{ node.assignee.department }}</span>
            </div>
            <div v-else class="flex items-center gap-1 text-sm text-amber-400">
              <User class="w-3.5 h-3.5" />
              <span>⚠ 未指定审批人</span>
            </div>

            <div class="flex items-center gap-1 text-xs text-slate-500">
              <FileText class="w-3 h-3" />
              <span>{{ getNodeRecordCount(node.id) }} 条记录</span>
            </div>
          </div>

          <div v-if="store.selectedNodeId === node.id" class="mt-2 space-y-1.5 animate-fade-in">
            <div class="flex items-center gap-2 text-xs">
              <span class="text-slate-500">必需角色：</span>
              <div class="flex gap-1 flex-wrap">
                <span
                  v-for="role in node.requiredRoles"
                  :key="role"
                  class="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20"
                >
                  {{ roleNameMap[role] ?? role }}
                </span>
                <span v-if="node.requiredRoles.length === 0" class="text-slate-600">无</span>
              </div>
            </div>

            <div v-if="node.operatedAt" class="flex items-center gap-2 text-xs text-slate-500">
              <Clock class="w-3 h-3" />
              <span>处理时间：{{ formatTime(node.operatedAt) }}</span>
            </div>

            <div v-if="node.remark" class="text-xs text-slate-400 italic bg-slate-700/30 px-2 py-1 rounded">
              {{ node.remark }}
            </div>

            <div
              v-if="getNodeRecordCount(node.id) === 0 && (node.status === 'approved' || node.status === 'rejected' || node.status === 'skipped')"
              class="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20"
            >
              <AlertCircle class="w-3 h-3" />
              <span>节点已处理但记录为空</span>
            </div>

            <div
              v-if="!node.assignee && node.status !== 'approved' && node.status !== 'rejected'"
              class="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20"
            >
              <AlertTriangle class="w-3 h-3" />
              <span>缺失审批人，流程可能阻塞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AlertCircle, AlertTriangle } from 'lucide-vue-next'
</script>
