<template>
  <aside
    class="fixed left-0 top-0 z-40 flex h-screen flex-col bg-slate-950 border-r border-slate-800 transition-all duration-300"
    :class="collapsed ? 'w-16' : 'w-60'"
  >
    <div class="flex h-14 items-center gap-3 border-b border-slate-800 px-4">
      <ShieldCheck class="h-6 w-6 shrink-0 text-accent" />
      <span
        v-show="!collapsed"
        class="truncate text-base font-semibold text-white transition-opacity duration-200"
      >
        审批工作台
      </span>
    </div>

    <nav class="mt-2 flex-1 space-y-1 px-2">
      <RouterLink
        to="/"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
        :class="isActive('/') ? 'bg-accent/10 text-accent' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'"
      >
        <LayoutDashboard class="h-5 w-5 shrink-0" />
        <span v-show="!collapsed" class="truncate">工作台</span>
      </RouterLink>
      <RouterLink
        to="/"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
        :class="isActive('/') && !$route.path.startsWith('/application') ? '' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'"
      >
        <FileText class="h-5 w-5 shrink-0" />
        <span v-show="!collapsed" class="truncate">全部申请</span>
      </RouterLink>
    </nav>

    <div class="border-t border-slate-800 p-2">
      <button
        class="flex w-full items-center justify-center rounded-lg py-2 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-300"
        @click="$emit('toggle')"
      >
        <component :is="collapsed ? ChevronRight : ChevronLeft" class="h-5 w-5" />
      </button>
    </div>

    <div v-if="!collapsed" class="border-t border-slate-800 p-3 space-y-2">
      <div class="flex items-center gap-2 px-1">
        <Users class="h-4 w-4 text-slate-500" />
        <span class="text-xs font-medium text-slate-500">当前角色</span>
      </div>
      <select
        :value="authStore.currentUser.id"
        class="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        @change="onRoleChange"
      >
        <option
          v-for="user in authStore.availableRoles"
          :key="user.id"
          :value="user.id"
        >
          {{ user.name }} · {{ roleNameMap[user.role] }}
        </option>
      </select>
    </div>

    <div v-else class="border-t border-slate-800 p-2">
      <div class="flex items-center justify-center">
        <button
          class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-800 hover:text-accent"
          :title="`${authStore.currentUser.name} · ${roleNameMap[authStore.currentUser.role]}`"
          @click="$emit('toggle')"
        >
          <Users class="h-5 w-5" />
        </button>
      </div>
    </div>
  </aside>

</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ShieldCheck, LayoutDashboard, FileText, ChevronLeft, ChevronRight, Users } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

defineProps<{
  collapsed: boolean
}>()

defineEmits<{
  toggle: []
}>()

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const roleNameMap: Record<string, string> = {
  super_admin: '超级管理员',
  department_approver: '部门审批人',
  finance_approver: '财务审批人',
  applicant: '普通申请人',
}

const isActive = (path: string) => {
  return route.path === path
}

const onRoleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  authStore.switchRole(target.value)
}
</script>
