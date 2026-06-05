export interface Applicant {
  id: string
  name: string
  department: string
  role: string
}

export interface Application {
  id: string
  title: string
  type: 'leave' | 'expense' | 'purchase' | 'overtime' | 'transfer'
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'processing'
  applicant: Applicant
  department: string
  amount?: number
  createdAt: string
  updatedAt: string
  flowId: string
}

export interface ApprovalNode {
  id: string
  order: number
  name: string
  type: 'submit' | 'department_approve' | 'finance_approve' | 'admin_approve' | 'complete'
  status: 'pending' | 'current' | 'approved' | 'rejected' | 'skipped'
  requiredRoles: string[]
  assignee?: Applicant
  operatedAt?: string
  remark?: string
}

export interface ApprovalFlow {
  id: string
  applicationId: string
  nodes: ApprovalNode[]
}

export interface RolePermission {
  roleId: string
  roleName: string
  permissions: string[]
  canApprove: boolean
  canReject: boolean
  canTransfer: boolean
}

export interface OperationRecord {
  id: string
  applicationId: string
  nodeId: string
  operator: Applicant
  action: 'approve' | 'reject' | 'transfer' | 'submit' | 'withdraw' | 'add_approver'
  remark: string
  operatedAt: string
}

export interface Alert {
  id: string
  type: 'over_permission' | 'missing_approver' | 'empty_record' | 'timeout' | 'conflict'
  severity: 'critical' | 'warning' | 'info'
  message: string
  applicationId: string
  nodeId?: string
  createdAt: string
  dismissed: boolean
}

export interface StatsOverview {
  pendingCount: number
  approvedCount: number
  exceptionCount: number
  todaySubmitted: number
  pendingTrend: number
  approvedTrend: number
  exceptionTrend: number
  todayTrend: number
}

export interface TrendData {
  date: string
  approved: number
  rejected: number
  pending: number
}

export interface TypeDistribution {
  type: string
  label: string
  count: number
  color: string
}

export interface DepartmentEfficiency {
  department: string
  avgHours: number
  approvalRate: number
  total: number
}

export interface CurrentUser {
  id: string
  name: string
  role: string
  department: string
  avatar?: string
}
