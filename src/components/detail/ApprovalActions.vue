<script setup lang="ts">
import { ref, computed } from 'vue'
import { CheckCircle, XCircle, ArrowRightLeft, ShieldAlert, AlertTriangle } from 'lucide-vue-next'
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

type ActionMode = 'approve' | 'reject' | 'transfer' | null

const actionMode = ref<ActionMode>(null)
const remark = ref('')
const targetUser = ref('')
const feedbackMsg = ref('')
const feedbackType = ref<'success' | 'error'>('success')
const showFeedback = ref(false)

const currentNode = computed(() => appStore.currentNode)
const currentApplication = computed(() => appStore.currentApplication)

const hasPermission = computed(() => {
  if (!currentNode.value) return false
  return appStore.checkPermission(currentNode.value.id)
})

const missingApprover = computed(() => {
  if (!currentNode.value) return false
  return !currentNode.value.assignee
})

const isApplicationActionable = computed(() => {
  if (!currentApplication.value) return false
  return currentApplication.value.status === 'pending' || currentApplication.value.status === 'processing'
})

const allDisabled = computed(() => !hasPermission.value || missingApprover.value || !isApplicationActionable.value)

const requiredRolesText = computed(() => {
  if (!currentNode.value) return ''
  return currentNode.value.requiredRoles.map(r => roleNameMap[r] ?? r).join('、')
})

function openAction(mode: ActionMode) {
  if (allDisabled.value) return
  actionMode.value = mode
  remark.value = ''
  targetUser.value = ''
}

function cancelAction() {
  actionMode.value = null
  remark.value = ''
  targetUser.value = ''
}

function displayFeedback(type: 'success' | 'error', msg: string) {
  feedbackType.value = type
  feedbackMsg.value = msg
  showFeedback.value = true
  setTimeout(() => {
    showFeedback.value = false
  }, 3000)
}

async function submitAction() {
  if (!currentApplication.value || !currentNode.value) return

  const id = currentApplication.value.id

  if (actionMode.value === 'approve') {
    const result = appStore.approveApplication(id, remark.value)
    if (result.success) {
      displayFeedback('success', '审批通过操作成功')
      cancelAction()
    } else {
      displayFeedback('error', result.reason ?? '操作失败')
    }
  } else if (actionMode.value === 'reject') {
    const result = appStore.rejectApplication(id, remark.value)
    if (result.success) {
      displayFeedback('success', '驳回操作成功')
      cancelAction()
    } else {
      displayFeedback('error', result.reason ?? '操作失败')
    }
  } else if (actionMode.value === 'transfer') {
    if (!targetUser.value.trim()) {
      displayFeedback('error', '请输入转交目标用户')
      return
    }
    const result = appStore.transferApplication(id, targetUser.value.trim(), remark.value)
    if (result.success) {
      displayFeedback('success', '转交操作成功')
      cancelAction()
    } else {
      displayFeedback('error', result.reason ?? '操作失败')
    }
  }
}
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700/50">
    <div
      v-if="showFeedback"
      :class="[
        'absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium animate-slide-down',
        feedbackType === 'success'
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          : 'bg-red-500/20 text-red-400 border border-red-500/30',
      ]"
    >
      {{ feedbackMsg }}
    </div>

    <div class="max-w-5xl mx-auto px-6 py-3">
      <div v-if="!hasPermission && currentNode" class="mb-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
        <ShieldAlert class="w-4 h-4 text-red-400 flex-shrink-0" />
        <span class="text-xs text-red-400">
          越权警告：当前角色[{{ roleNameMap[authStore.currentUser.role] ?? authStore.currentUser.role }}]无权审批此节点，需要：{{ requiredRolesText }}
        </span>
      </div>

      <div v-if="missingApprover && currentNode" class="mb-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-2">
        <AlertTriangle class="w-4 h-4 text-amber-400 flex-shrink-0" />
        <span class="text-xs text-amber-400">缺审批人：此节点未指定审批人，无法执行操作</span>
      </div>

      <div class="flex items-center justify-between gap-4">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-slate-200 truncate">
            {{ currentApplication?.title ?? '未选择申请' }}
          </p>
          <p class="text-xs text-slate-500">
            当前节点：{{ currentNode?.name ?? '—' }}
          </p>
        </div>

        <div class="flex items-center gap-3 flex-shrink-0">
          <button
            :disabled="allDisabled"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              allDisabled
                ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30',
            ]"
            @click="openAction('approve')"
          >
            <CheckCircle class="w-4 h-4" />
            通过
          </button>

          <button
            :disabled="allDisabled"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              allDisabled
                ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                : 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30',
            ]"
            @click="openAction('reject')"
          >
            <XCircle class="w-4 h-4" />
            驳回
          </button>

          <button
            :disabled="allDisabled"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              allDisabled
                ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30',
            ]"
            @click="openAction('transfer')"
          >
            <ArrowRightLeft class="w-4 h-4" />
            转交
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="actionMode"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        @click.self="cancelAction"
      >
        <div class="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md mx-4 p-6 animate-slide-down">
          <h3 class="text-lg font-semibold text-slate-200 mb-4">
            {{ actionMode === 'approve' ? '通过审批' : actionMode === 'reject' ? '驳回审批' : '转交审批' }}
          </h3>

          <div v-if="actionMode === 'transfer'" class="mb-4">
            <label class="block text-sm text-slate-400 mb-1.5">目标用户</label>
            <input
              v-model="targetUser"
              type="text"
              placeholder="请输入转交目标用户姓名"
              class="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm text-slate-400 mb-1.5">备注</label>
            <textarea
              v-model="remark"
              :rows="3"
              :placeholder="actionMode === 'approve' ? '请输入审批意见（可选）' : actionMode === 'reject' ? '请输入驳回原因' : '请输入转交说明（可选）'"
              class="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div class="flex justify-end gap-3">
            <button
              class="px-4 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-700 transition-colors"
              @click="cancelAction"
            >
              取消
            </button>
            <button
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                actionMode === 'approve'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : actionMode === 'reject'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700',
              ]"
              @click="submitAction"
            >
              确认{{ actionMode === 'approve' ? '通过' : actionMode === 'reject' ? '驳回' : '转交' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
