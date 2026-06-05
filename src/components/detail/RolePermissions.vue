<script setup lang="ts">
import { computed } from 'vue'
import { Check, X, ShieldAlert, AlertTriangle } from 'lucide-vue-next'
import { useApplicationStore } from '@/stores/application'
import { useAuthStore } from '@/stores/auth'

const appStore = useApplicationStore()
const authStore = useAuthStore()

const roleNameMap: Record<string, string> = {
  super_admin: '超级管理员',
  department_approver: '部门审批人',
  finance_approver: '财务审批人',
  applicant: '普通申请人',
}

const selectedNode = computed(() => appStore.selectedNode)
const permissions = computed(() => appStore.selectedNodePermissions)

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

function isNoPermissionRow(perm: { canApprove: boolean; canReject: boolean; canTransfer: boolean }) {
  return !perm.canApprove && !perm.canReject && !perm.canTransfer
}

function resolveRoleName(perm: { roleId: string; roleName: string }): string {
  return roleNameMap[perm.roleId] ?? perm.roleName
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
      请选择审批节点
    </div>

    <template v-else>
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
              <th class="text-center px-4 py-3 font-medium">审批权限</th>
              <th class="text-center px-4 py-3 font-medium">驳回权限</th>
              <th class="text-center px-4 py-3 font-medium">转办权限</th>
              <th class="text-left px-4 py-3 font-medium">权限范围</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="perm in permissions"
              :key="perm.roleId"
              :class="[
                'border-b border-slate-700/30 transition-colors',
                isNoPermissionRow(perm) ? 'bg-red-500/5' : 'hover:bg-slate-700/30',
              ]"
            >
              <td class="px-5 py-3">
                <span
                  :class="[
                    'font-medium',
                    isNoPermissionRow(perm) ? 'text-red-400' : 'text-slate-200',
                  ]"
                >
                  {{ resolveRoleName(perm) }}
                </span>
              </td>
              <td class="text-center px-4 py-3">
                <Check v-if="perm.canApprove" class="w-4 h-4 text-emerald-500 inline-block" />
                <X v-else class="w-4 h-4 text-red-500 inline-block" />
              </td>
              <td class="text-center px-4 py-3">
                <Check v-if="perm.canReject" class="w-4 h-4 text-emerald-500 inline-block" />
                <X v-else class="w-4 h-4 text-red-500 inline-block" />
              </td>
              <td class="text-center px-4 py-3">
                <Check v-if="perm.canTransfer" class="w-4 h-4 text-emerald-500 inline-block" />
                <X v-else class="w-4 h-4 text-red-500 inline-block" />
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
            </tr>
            <tr v-if="permissions.length === 0">
              <td colspan="5" class="px-5 py-6 text-center text-slate-500">
                此节点无关联角色权限
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
