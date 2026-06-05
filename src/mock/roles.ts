import type { RolePermission } from '@/types'

export const roles: RolePermission[] = [
  {
    roleId: 'super_admin',
    roleName: '超级管理员',
    permissions: ['view_all', 'approve_all', 'reject_all', 'transfer_all', 'manage_users', 'manage_flows', 'view_analytics', 'manage_alerts'],
    canApprove: true,
    canReject: true,
    canTransfer: true
  },
  {
    roleId: 'department_approver',
    roleName: '部门审批人',
    permissions: ['view_department', 'approve_department', 'reject_department', 'transfer_department'],
    canApprove: true,
    canReject: true,
    canTransfer: true
  },
  {
    roleId: 'finance_approver',
    roleName: '财务审批人',
    permissions: ['view_finance', 'approve_finance', 'reject_finance'],
    canApprove: true,
    canReject: true,
    canTransfer: false
  },
  {
    roleId: 'applicant',
    roleName: '申请人',
    permissions: ['view_own', 'submit_application', 'withdraw_own'],
    canApprove: false,
    canReject: false,
    canTransfer: false
  }
]
