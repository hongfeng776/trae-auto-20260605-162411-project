import type { Alert } from '@/types'

export const alerts: Alert[] = [
  {
    id: 'ALERT-001',
    type: 'over_permission',
    severity: 'critical',
    message: '申请人张伟在APP-016中尝试审批自己提交的申请，存在越权操作风险',
    applicationId: 'APP-016',
    nodeId: 'NODE-016-2',
    createdAt: '2026-06-04T16:10:00Z',
    dismissed: false
  },
  {
    id: 'ALERT-002',
    type: 'missing_approver',
    severity: 'critical',
    message: 'APP-001的部门审批节点(NODE-001-2)未分配审批人，流程无法继续',
    applicationId: 'APP-001',
    nodeId: 'NODE-001-2',
    createdAt: '2026-06-04T09:20:00Z',
    dismissed: false
  },
  {
    id: 'ALERT-003',
    type: 'missing_approver',
    severity: 'critical',
    message: 'APP-005的行政审批节点(NODE-005-3)未分配审批人，流程已停滞',
    applicationId: 'APP-005',
    nodeId: 'NODE-005-3',
    createdAt: '2026-06-02T09:35:00Z',
    dismissed: false
  },
  {
    id: 'ALERT-004',
    type: 'missing_approver',
    severity: 'warning',
    message: 'APP-006的部门审批节点(NODE-006-2)未分配审批人',
    applicationId: 'APP-006',
    nodeId: 'NODE-006-2',
    createdAt: '2026-06-03T17:00:00Z',
    dismissed: false
  },
  {
    id: 'ALERT-005',
    type: 'empty_record',
    severity: 'warning',
    message: 'APP-005的部门审批节点(NODE-005-2)已通过但无操作记录，存在合规风险',
    applicationId: 'APP-005',
    nodeId: 'NODE-005-2',
    createdAt: '2026-06-02T10:00:00Z',
    dismissed: false
  },
  {
    id: 'ALERT-006',
    type: 'timeout',
    severity: 'critical',
    message: 'APP-005的行政审批节点(NODE-005-3)已超过48小时未处理',
    applicationId: 'APP-005',
    nodeId: 'NODE-005-3',
    createdAt: '2026-06-04T09:30:00Z',
    dismissed: false
  },
  {
    id: 'ALERT-007',
    type: 'timeout',
    severity: 'critical',
    message: 'APP-008的部门审批节点(NODE-008-2)已超过48小时未处理',
    applicationId: 'APP-008',
    nodeId: 'NODE-008-2',
    createdAt: '2026-06-03T13:00:00Z',
    dismissed: false
  },
  {
    id: 'ALERT-008',
    type: 'conflict',
    severity: 'warning',
    message: 'APP-007中杨芳同时作为申请人和部门审批人，存在利益冲突',
    applicationId: 'APP-007',
    nodeId: 'NODE-007-2',
    createdAt: '2026-05-20T11:05:00Z',
    dismissed: true
  },
  {
    id: 'ALERT-009',
    type: 'conflict',
    severity: 'warning',
    message: 'APP-012中黄丽同时为申请人和财务审批人，存在利益冲突',
    applicationId: 'APP-012',
    nodeId: 'NODE-012-3',
    createdAt: '2026-06-04T08:35:00Z',
    dismissed: false
  },
  {
    id: 'ALERT-010',
    type: 'over_permission',
    severity: 'warning',
    message: 'APP-009中吴静以部门审批人身份审批了自己提交的加班申请',
    applicationId: 'APP-009',
    nodeId: 'NODE-009-2',
    createdAt: '2026-05-23T09:20:00Z',
    dismissed: true
  },
  {
    id: 'ALERT-011',
    type: 'empty_record',
    severity: 'info',
    message: 'APP-010的部门审批节点(NODE-010-2)被跳过，无操作记录',
    applicationId: 'APP-010',
    nodeId: 'NODE-010-2',
    createdAt: '2026-05-18T14:05:00Z',
    dismissed: true
  },
  {
    id: 'ALERT-012',
    type: 'over_permission',
    severity: 'info',
    message: 'APP-008中周明同时作为申请人和部门审批人，建议调整审批流程',
    applicationId: 'APP-008',
    nodeId: 'NODE-008-2',
    createdAt: '2026-06-01T13:10:00Z',
    dismissed: false
  }
]
