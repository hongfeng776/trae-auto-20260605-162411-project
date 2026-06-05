<script setup lang="ts">
import { computed } from 'vue'
import { Check, X, ShieldAlert, AlertTriangle, User, Clock, FileText } from 'lucide-vue-next'
import { useApplicationStore } from '@/stores/application'
import { useAuthStore } from '@/stores/auth'
import type { RolePermission } from '@/types'

const appStore = useApplicationStore()
const authStore = useAuthStore()

const roleNameMap: Record<string, string> = {
  super_admin: '超级管理员',
  department_approver: '部门审批人',
  finance_approver: '财务审批人',
  applicant: '普通申请人',
}

const selectedNode = computed(() => appStore.selectedNode)
const nodePermissions = computed(() => appStore.selectedNodePermissions)

const allRoles = computed(() => {
  const requiredRoleIds = selectedNode.value?.requiredRoles ?? []
  return appStore.currentPermissions.map(perm => ({
    ...perm,
    isRequired: requiredRoleIds.includes(perm.roleId),
  }))
})

const userRoleNotInRequired = computed(() => {
  const node = selectedNode.value
  if (!node) return false
  return node.requiredRoles.length > 0 && !node.requiredRoles.includes(authStore.currentUser.role)
})

const nodeHasNoAssignee = computed(() => {
  const node = selectedNode.value
  if (!node) return false
  return !node.assignee
})

const requiredRolesText = computed(() => {
  const node = selectedNode.value
  if (!node) return ''
  return node.requiredRoles.map(r => roleNameMap[r] ?? r).join('、')
})

const recordCount = computed(() => {
  if (!selectedNode.value) return 0
  return appStore.selectedNodeRecords.length
})

function isNoPermissionRow(perm: RolePermission) {
  return !perm.canApprove && !perm.canReject && !perm.canTransfer
}

function resolveRoleName(perm: { roleId: string; roleName: string }): string {
  return roleNameMap[perm.roleId] ?? perm.roleName
}

function formatTime(iso: string) {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
</script>

<template>
  <div class="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
    <div class="px-5 py-4 border-b border-slate-700/50 flex items-center gap-2">
      <ShieldAlert class="w-5 h-5 text-amber-500" />
      <h3 class="text-sm font-semibold text-slate-200">
        角色权限
        <span v-if="selectedNode" class="text-slate-400 font-normal"> — {{ selectedNode.name }}</span>
      </h3>
    </div>

    <div v-if="!selectedNode" class="py-12 text-center text-slate-500">
      请选择审批节点查看角色权限
    </div>

    <template v-else>
      <div class="px-5 py-3 border-b border-slate-700/30 bg-slate-800/30">
        <div class="grid grid-cols-2 gap-3">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
              <User class="w-3.5 h-3.5" :class="selectedNode.assignee ? 'text-slate-300' : 'text-amber-400'" />
            </div>
            <div class="min-w-0">
              <p class="text-xs text-slate-500">审批人</p>
              <p v-if="selectedNode.assignee" class="text-sm text-slate-200 truncate">
                {{ selectedNode.assignee.name }}
                <span class="text-slate-500">· {{ roleNameMap[selectedNode.assignee.role] ?? selectedNode.assignee.role }}</span>
              </p>
              <p v-else class="text-sm text-amber-400">未指定</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
              <FileText class="w-3.5 h-3.5 text-slate-300" />
            </div>
            <div class="min-w-0">
              <p class="text-xs text-slate-500">操作记录</p>
              <p class="text-sm text-slate-200">{{ recordCount }} 条</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
              <Clock class="w-3.5 h-3.5 text-slate-300" />
            </div>
            <div class="min-w-0">
              <p class="text-xs text-slate-500">处理时间</p>
              <p v-if="selectedNode.operatedAt" class="text-sm text-slate-200">{{ formatTime(selectedNode.operatedAt) }}</p>
              <p v-else class="text-sm text-slate-500">—</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" :class="selectedNode.status === 'current' ? 'bg-amber-500/20' : 'bg-slate-700'">
              <Clock class="w-3.5 h-3.5" :class="selectedNode.status === 'current' ? 'text-amber-400' : 'text-slate-300'" />
            </div>
            <div class="min-w-0">
              <p class="text-xs text-slate-500">节点状态</p>
              <p class="text-sm" :class="{
                'text-emerald-400': selectedNode.status === 'approved',
                'text-red-400': selectedNode.status === 'rejected',
                'text-amber-400': selectedNode.status === 'current',
                'text-slate-400': selectedNode.status === 'pending',
                'text-slate-500': selectedNode.status === 'skipped',
              }">
                {{ { approved: '已通过', rejected: '已驳回', current: '处理中', pending: '待处理', skipped: '已跳过' }[selectedNode.status] }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="userRoleNotInRequired" class="mx-5 mt-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
        <ShieldAlert class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p class="text-sm font-medium text-red-400">⚠ 当前角色无权操作此节点</p>
          <p class="text-xs text-red-400/70 mt-1">
            当前角色：<span class="font-medium">{{ roleNameMap[authStore.currentUser.role] ?? authStore.currentUser.role }}</span>，
            需要角色：{{ requiredRolesText }}
          </p>
        </div>
      </div>

      <div v-if="nodeHasNoAssignee" class="mx-5 mt-4 px-4 py-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-2">
        <AlertTriangle class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <p class="text-sm text-amber-400">此节点未指定审批人，流程可能阻塞</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-700/50 text-slate-400">
              <th class="text-left px-5 py-3 font-medium">角色</th>
              <th class="text-center px-4 py-3 font-medium">审批</th>
              <th class="text-center px-4 py-3 font-medium">驳回</th>
              <th class="text-center px-4 py-3 font-medium">转办</th>
              <th class="text-left px-4 py-3 font-medium">权限范围</th>
              <th class="text-center px-4 py-3 font-medium">关联</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="perm in allRoles"
              :key="perm.roleId"
              :class="[
                'border-b border-slate-700/30 transition-colors',
                isNoPermissionRow(perm) ? 'bg-red-500/5' : '',
                perm.isRequired ? 'bg-amber-500/5' : '',
                !perm.isRequired && !isNoPermissionRow(perm) ? 'hover:bg-slate-700/30' : '',
              ]"
            >
              <td class="px-5 py-3">
                <div class="flex items-center gap-2">
                  <span
                    :class="[
                      'font-medium',
                      isNoPermissionRow(perm) ? 'text-red-400' : perm.isRequired ? 'text-amber-300' : 'text-slate-200',
                    ]"
                  >
                    {{ resolveRoleName(perm) }}
                  </span>
                </div>
              </td>
              <td class="text-center px-4 py-3">
                <Check v-if="perm.canApprove" class="w-4 h-4 text-emerald-500 inline-block" />
                <X v-else class="w-4 h-4 text-red-500/50 inline-block" />
              </td>
              <td class="text-center px-4 py-3">
                <Check v-if="perm.canReject" class="w-4 h-4 text-emerald-500 inline-block" />
                <X v-else class="w-4 h-4 text-red-500/50 inline-block" />
              </td>
              <td class="text-center px-4 py-3">
                <Check v-if="perm.canTransfer" class="w-4 h-4 text-emerald-500 inline-block" />
                <X v-else class="w-4 h-4 text-red-500/50 inline-block" />
              </td>
              <td class="px-4 py-3">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="p in perm.permissions.slice(0, 3)"
                    :key="p"
                    class="text-xs px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-400"
                  >
                    {{ p }}
                  </span>
                  <span
                    v-if="perm.permissions.length > 3"
                    class="text-xs px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-400"
                  >
                    +{{ perm.permissions.length - 3 }}
                  </span>
                </div>
              </td>
              <td class="text-center px-4 py-3">
                <span
                  v-if="perm.isRequired"
                  class="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30"
                >
                  必需
                </span>
                <span v-else class="text-xs text-slate-600">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
