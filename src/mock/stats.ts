import type { StatsOverview, TrendData, TypeDistribution, DepartmentEfficiency } from '@/types'

export const statsOverview: StatsOverview = {
  pendingCount: 7,
  approvedCount: 9,
  exceptionCount: 4,
  todaySubmitted: 3,
  pendingTrend: 12.5,
  approvedTrend: -3.2,
  exceptionTrend: 25.0,
  todayTrend: 50.0
}

export const trendData: TrendData[] = [
  { date: '2026-05-07', approved: 3, rejected: 1, pending: 5 },
  { date: '2026-05-08', approved: 2, rejected: 0, pending: 4 },
  { date: '2026-05-09', approved: 4, rejected: 1, pending: 6 },
  { date: '2026-05-10', approved: 3, rejected: 2, pending: 3 },
  { date: '2026-05-11', approved: 1, rejected: 0, pending: 5 },
  { date: '2026-05-12', approved: 5, rejected: 1, pending: 4 },
  { date: '2026-05-13', approved: 2, rejected: 0, pending: 3 },
  { date: '2026-05-14', approved: 3, rejected: 2, pending: 6 },
  { date: '2026-05-15', approved: 4, rejected: 1, pending: 5 },
  { date: '2026-05-16', approved: 1, rejected: 0, pending: 4 },
  { date: '2026-05-17', approved: 2, rejected: 1, pending: 3 },
  { date: '2026-05-18', approved: 3, rejected: 0, pending: 5 },
  { date: '2026-05-19', approved: 2, rejected: 1, pending: 4 },
  { date: '2026-05-20', approved: 4, rejected: 0, pending: 6 },
  { date: '2026-05-21', approved: 3, rejected: 1, pending: 3 },
  { date: '2026-05-22', approved: 5, rejected: 2, pending: 7 },
  { date: '2026-05-23', approved: 2, rejected: 1, pending: 5 },
  { date: '2026-05-24', approved: 1, rejected: 0, pending: 4 },
  { date: '2026-05-25', approved: 4, rejected: 0, pending: 3 },
  { date: '2026-05-26', approved: 3, rejected: 1, pending: 5 },
  { date: '2026-05-27', approved: 2, rejected: 2, pending: 4 },
  { date: '2026-05-28', approved: 5, rejected: 1, pending: 6 },
  { date: '2026-05-29', approved: 3, rejected: 1, pending: 5 },
  { date: '2026-05-30', approved: 4, rejected: 0, pending: 4 },
  { date: '2026-05-31', approved: 2, rejected: 1, pending: 6 },
  { date: '2026-06-01', approved: 3, rejected: 0, pending: 7 },
  { date: '2026-06-02', approved: 4, rejected: 1, pending: 5 },
  { date: '2026-06-03', approved: 2, rejected: 0, pending: 6 },
  { date: '2026-06-04', approved: 3, rejected: 1, pending: 7 },
  { date: '2026-06-05', approved: 1, rejected: 0, pending: 5 }
]

export const typeDistribution: TypeDistribution[] = [
  { type: 'leave', label: '请假', count: 6, color: '#6366f1' },
  { type: 'expense', label: '报销', count: 6, color: '#f59e0b' },
  { type: 'purchase', label: '采购', count: 5, color: '#10b981' },
  { type: 'overtime', label: '加班', count: 5, color: '#ef4444' },
  { type: 'transfer', label: '调岗', count: 3, color: '#8b5cf6' }
]

export const departmentEfficiency: DepartmentEfficiency[] = [
  { department: '技术部', avgHours: 18.5, approvalRate: 85.7, total: 7 },
  { department: '财务部', avgHours: 24.2, approvalRate: 80.0, total: 5 },
  { department: '市场部', avgHours: 36.8, approvalRate: 60.0, total: 5 },
  { department: '人事部', avgHours: 12.3, approvalRate: 75.0, total: 4 },
  { department: '运营部', avgHours: 22.1, approvalRate: 66.7, total: 4 }
]
