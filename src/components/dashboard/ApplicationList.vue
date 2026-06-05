<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useApplicationStore } from '@/stores/application'

const router = useRouter()
const store = useApplicationStore()

onMounted(() => {
  if (store.applications.length === 0) {
    store.fetchApplications()
  }
})

const statusOptions = [
  { value: '', label: '全部' },
  { value: 'pending', label: '待审批' },
  { value: 'processing', label: '审批中' },
  { value: 'approved', label: '已通过' },
  { value: 'rejected', label: '已驳回' },
  { value: 'cancelled', label: '已取消' },
]

const typeOptions = [
  { value: '', label: '全部' },
  { value: 'leave', label: '请假' },
  { value: 'expense', label: '报销' },
  { value: 'purchase', label: '采购' },
  { value: 'overtime', label: '加班' },
  { value: 'transfer', label: '调岗' },
]

const departmentOptions = [
  { value: '', label: '全部' },
  { value: '技术部', label: '技术部' },
  { value: '财务部', label: '财务部' },
  { value: '市场部', label: '市场部' },
  { value: '人事部', label: '人事部' },
  { value: '运营部', label: '运营部' },
]

const roleOptions = [
  { value: '', label: '全部角色' },
  { value: 'super_admin', label: '超级管理员' },
  { value: 'department_approver', label: '部门审批人' },
  { value: 'finance_approver', label: '财务审批人' },
  { value: 'applicant', label: '申请人' },
]

const statusBadge: Record<string, string> = {
  pending: 'bg-amber-500/20 text-amber-400',
  processing: 'bg-blue-500/20 text-blue-400',
  approved: 'bg-green-500/20 text-green-400',
  rejected: 'bg-red-500/20 text-red-400',
  cancelled: 'bg-slate-500/20 text-slate-400',
}

const statusLabel: Record<string, string> = {
  pending: '待审批',
  processing: '审批中',
  approved: '已通过',
  rejected: '已驳回',
  cancelled: '已取消',
}

const typeBadge: Record<string, string> = {
  leave: 'bg-indigo-500/20 text-indigo-400',
  expense: 'bg-amber-500/20 text-amber-400',
  purchase: 'bg-emerald-500/20 text-emerald-400',
  overtime: 'bg-red-500/20 text-red-400',
  transfer: 'bg-violet-500/20 text-violet-400',
}

const typeLabel: Record<string, string> = {
  leave: '请假',
  expense: '报销',
  purchase: '采购',
  overtime: '加班',
  transfer: '调岗',
}

function formatAmount(amount?: number): string {
  if (amount === undefined || amount === null) return '--'
  return `¥${amount.toLocaleString()}`
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${mm}-${dd} ${hh}:${mi}`
}

function goToDetail(id: string) {
  router.push(`/application/${id}`)
}
</script>

<template>
  <div class="bg-[#1e293b] rounded-xl overflow-hidden">
    <div class="p-4 border-b border-slate-700/50">
      <div class="flex flex-wrap items-center gap-3">
        <select
          :value="store.filterStatus"
          class="bg-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:border-slate-500"
          @change="store.setFilterStatus(($event.target as HTMLSelectElement).value)"
        >
          <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
        <select
          :value="store.filterType"
          class="bg-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:border-slate-500"
          @change="store.setFilterType(($event.target as HTMLSelectElement).value)"
        >
          <option v-for="opt in typeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
        <select
          :value="store.filterDepartment"
          class="bg-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:border-slate-500"
          @change="store.setFilterDepartment(($event.target as HTMLSelectElement).value)"
        >
          <option v-for="opt in departmentOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
        <select
          :value="store.filterRole"
          class="bg-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:border-slate-500"
          @change="store.setFilterRole(($event.target as HTMLSelectElement).value)"
        >
          <option v-for="opt in roleOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
        <div class="relative flex-1 min-w-[200px]">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            :value="store.searchQuery"
            type="text"
            placeholder="搜索申请编号、标题、申请人..."
            class="w-full bg-slate-800 text-slate-200 text-sm rounded-lg pl-9 pr-3 py-2 border border-slate-600 focus:outline-none focus:border-slate-500 placeholder-slate-500"
            @input="store.setSearchQuery(($event.target as HTMLInputElement).value)"
          />
        </div>
        <button
          class="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors px-3 py-2"
          @click="store.resetFilters()"
        >
          <RotateCcw class="w-4 h-4" />
          重置
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-slate-400 text-left">
            <th class="px-4 py-3 font-medium">申请编号</th>
            <th class="px-4 py-3 font-medium">标题</th>
            <th class="px-4 py-3 font-medium">类型</th>
            <th class="px-4 py-3 font-medium">申请人</th>
            <th class="px-4 py-3 font-medium">部门</th>
            <th class="px-4 py-3 font-medium">金额</th>
            <th class="px-4 py-3 font-medium">状态</th>
            <th class="px-4 py-3 font-medium">提交时间</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(app, index) in store.paginatedApplications"
            :key="app.id"
            :class="[index % 2 === 0 ? 'bg-[#1e293b]' : 'bg-[#172033]', 'hover:bg-slate-700/40 transition-colors cursor-pointer']"
            @click="goToDetail(app.id)"
          >
            <td class="px-4 py-3">
              <span
                class="text-blue-400 hover:text-blue-300 hover:underline"
                @click.stop="goToDetail(app.id)"
              >{{ app.id }}</span>
            </td>
            <td class="px-4 py-3 text-slate-200">{{ app.title }}</td>
            <td class="px-4 py-3">
              <span :class="[typeBadge[app.type], 'px-2 py-0.5 rounded-full text-xs font-medium']">
                {{ typeLabel[app.type] }}
              </span>
            </td>
            <td class="px-4 py-3 text-slate-200">{{ app.applicant.name }}</td>
            <td class="px-4 py-3 text-slate-300">{{ app.department }}</td>
            <td class="px-4 py-3 text-slate-300 font-['JetBrains_Mono',monospace]">{{ formatAmount(app.amount) }}</td>
            <td class="px-4 py-3">
              <span :class="[statusBadge[app.status], 'px-2 py-0.5 rounded-full text-xs font-medium']">
                {{ statusLabel[app.status] }}
              </span>
            </td>
            <td class="px-4 py-3 text-slate-400">{{ formatDate(app.createdAt) }}</td>
          </tr>
          <tr v-if="store.paginatedApplications.length === 0">
            <td colspan="8" class="px-4 py-8 text-center text-slate-500">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between px-4 py-3 border-t border-slate-700/50">
      <span class="text-sm text-slate-400">
        共 {{ store.filteredApplications.length }} 条，第 {{ store.currentPage }} / {{ store.totalPages || 1 }} 页
      </span>
      <div class="flex items-center gap-2">
        <button
          :disabled="store.currentPage <= 1"
          class="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-slate-800 text-slate-300 border border-slate-600 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          @click="store.setPage(store.currentPage - 1)"
        >
          <ChevronLeft class="w-4 h-4" />
          上一页
        </button>
        <button
          :disabled="store.currentPage >= store.totalPages"
          class="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-slate-800 text-slate-300 border border-slate-600 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          @click="store.setPage(store.currentPage + 1)"
        >
          下一页
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
