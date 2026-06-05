import type { OperationRecord } from '@/types'

export const records: OperationRecord[] = [
  {
    id: 'REC-001',
    applicationId: 'APP-001',
    nodeId: 'NODE-001-1',
    operator: { id: 'user-01', name: '张伟', department: '技术部', role: 'developer' },
    action: 'submit',
    remark: '申请年假3天回乡探亲',
    operatedAt: '2026-06-04T09:15:00Z'
  },
  {
    id: 'REC-002',
    applicationId: 'APP-002',
    nodeId: 'NODE-002-1',
    operator: { id: 'user-02', name: '李娜', department: '财务部', role: 'finance_staff' },
    action: 'submit',
    remark: '部门团建费用报销申请',
    operatedAt: '2026-06-02T14:30:00Z'
  },
  {
    id: 'REC-003',
    applicationId: 'APP-002',
    nodeId: 'NODE-002-2',
    operator: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
    action: 'approve',
    remark: '同意报销',
    operatedAt: '2026-06-03T09:00:00Z'
  },
  {
    id: 'REC-004',
    applicationId: 'APP-002',
    nodeId: 'NODE-002-3',
    operator: { id: 'user-12', name: '黄丽', department: '财务部', role: 'finance_staff' },
    action: 'approve',
    remark: '费用合规，同意支付',
    operatedAt: '2026-06-03T15:00:00Z'
  },
  {
    id: 'REC-005',
    applicationId: 'APP-003',
    nodeId: 'NODE-003-1',
    operator: { id: 'user-03', name: '王强', department: '市场部', role: 'marketing_staff' },
    action: 'submit',
    remark: '市场推广物料采购申请',
    operatedAt: '2026-05-28T10:00:00Z'
  },
  {
    id: 'REC-006',
    applicationId: 'APP-003',
    nodeId: 'NODE-003-2',
    operator: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
    action: 'approve',
    remark: '同意采购，请财务审核',
    operatedAt: '2026-05-28T15:00:00Z'
  },
  {
    id: 'REC-007',
    applicationId: 'APP-003',
    nodeId: 'NODE-003-3',
    operator: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
    action: 'reject',
    remark: '预算超支，需补充预算说明后重新提交',
    operatedAt: '2026-05-29T11:45:00Z'
  },
  {
    id: 'REC-008',
    applicationId: 'APP-004',
    nodeId: 'NODE-004-1',
    operator: { id: 'user-04', name: '赵敏', department: '人事部', role: 'hr_staff' },
    action: 'submit',
    remark: '系统上线加班申请',
    operatedAt: '2026-05-25T08:00:00Z'
  },
  {
    id: 'REC-009',
    applicationId: 'APP-004',
    nodeId: 'NODE-004-2',
    operator: { id: 'user-09', name: '吴静', department: '人事部', role: 'hr_manager' },
    action: 'approve',
    remark: '同意加班安排',
    operatedAt: '2026-05-25T10:30:00Z'
  },
  {
    id: 'REC-010',
    applicationId: 'APP-005',
    nodeId: 'NODE-005-1',
    operator: { id: 'user-05', name: '刘洋', department: '运营部', role: 'ops_staff' },
    action: 'submit',
    remark: '申请从运营部调至技术部',
    operatedAt: '2026-06-01T11:00:00Z'
  },
  {
    id: 'REC-011',
    applicationId: 'APP-005',
    nodeId: 'NODE-005-2',
    operator: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
    action: 'transfer',
    remark: '转交行政审批处理',
    operatedAt: '2026-06-01T14:00:00Z'
  },
  {
    id: 'REC-012',
    applicationId: 'APP-006',
    nodeId: 'NODE-006-1',
    operator: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
    action: 'submit',
    remark: '身体检查需请假一天',
    operatedAt: '2026-06-03T16:45:00Z'
  },
  {
    id: 'REC-013',
    applicationId: 'APP-007',
    nodeId: 'NODE-007-1',
    operator: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
    action: 'submit',
    remark: '北京出差差旅费用报销',
    operatedAt: '2026-05-20T09:00:00Z'
  },
  {
    id: 'REC-014',
    applicationId: 'APP-007',
    nodeId: 'NODE-007-2',
    operator: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
    action: 'approve',
    remark: '确认出差事项',
    operatedAt: '2026-05-20T11:00:00Z'
  },
  {
    id: 'REC-015',
    applicationId: 'APP-007',
    nodeId: 'NODE-007-3',
    operator: { id: 'user-12', name: '黄丽', department: '财务部', role: 'finance_staff' },
    action: 'approve',
    remark: '发票核实无误，同意报销',
    operatedAt: '2026-05-22T09:30:00Z'
  },
  {
    id: 'REC-016',
    applicationId: 'APP-008',
    nodeId: 'NODE-008-1',
    operator: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
    action: 'submit',
    remark: '采购笔记本电脑5台',
    operatedAt: '2026-06-01T13:00:00Z'
  },
  {
    id: 'REC-017',
    applicationId: 'APP-009',
    nodeId: 'NODE-009-1',
    operator: { id: 'user-09', name: '吴静', department: '人事部', role: 'hr_manager' },
    action: 'submit',
    remark: '季度结算加班申请',
    operatedAt: '2026-05-22T15:30:00Z'
  },
  {
    id: 'REC-018',
    applicationId: 'APP-009',
    nodeId: 'NODE-009-2',
    operator: { id: 'user-09', name: '吴静', department: '人事部', role: 'hr_manager' },
    action: 'reject',
    remark: '加班人员已满额，请调整排班',
    operatedAt: '2026-05-23T09:15:00Z'
  },
  {
    id: 'REC-019',
    applicationId: 'APP-010',
    nodeId: 'NODE-010-1',
    operator: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
    action: 'submit',
    remark: '家人婚礼请假两天',
    operatedAt: '2026-05-18T10:20:00Z'
  },
  {
    id: 'REC-020',
    applicationId: 'APP-010',
    nodeId: 'NODE-010-1',
    operator: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
    action: 'withdraw',
    remark: '婚礼延期，暂不需要请假',
    operatedAt: '2026-05-18T14:00:00Z'
  },
  {
    id: 'REC-021',
    applicationId: 'APP-011',
    nodeId: 'NODE-011-1',
    operator: { id: 'user-11', name: '马超', department: '技术部', role: 'developer' },
    action: 'submit',
    remark: '申请从技术岗位调至产品岗位',
    operatedAt: '2026-05-15T08:30:00Z'
  },
  {
    id: 'REC-022',
    applicationId: 'APP-011',
    nodeId: 'NODE-011-2',
    operator: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
    action: 'approve',
    remark: '同意调岗',
    operatedAt: '2026-05-15T14:00:00Z'
  },
  {
    id: 'REC-023',
    applicationId: 'APP-011',
    nodeId: 'NODE-011-3',
    operator: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
    action: 'add_approver',
    remark: '增加行政审批环节确认',
    operatedAt: '2026-05-15T14:30:00Z'
  },
  {
    id: 'REC-024',
    applicationId: 'APP-011',
    nodeId: 'NODE-011-3',
    operator: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
    action: 'approve',
    remark: '行政手续已办理',
    operatedAt: '2026-05-16T10:00:00Z'
  },
  {
    id: 'REC-025',
    applicationId: 'APP-012',
    nodeId: 'NODE-012-1',
    operator: { id: 'user-12', name: '黄丽', department: '财务部', role: 'finance_staff' },
    action: 'submit',
    remark: '办公用品采购报销',
    operatedAt: '2026-06-03T10:00:00Z'
  },
  {
    id: 'REC-026',
    applicationId: 'APP-012',
    nodeId: 'NODE-012-2',
    operator: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
    action: 'approve',
    remark: '同意',
    operatedAt: '2026-06-03T14:00:00Z'
  },
  {
    id: 'REC-027',
    applicationId: 'APP-013',
    nodeId: 'NODE-013-1',
    operator: { id: 'user-13', name: '林浩', department: '市场部', role: 'marketing_staff' },
    action: 'submit',
    remark: '服务器设备采购申请',
    operatedAt: '2026-05-10T09:00:00Z'
  },
  {
    id: 'REC-028',
    applicationId: 'APP-013',
    nodeId: 'NODE-013-2',
    operator: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
    action: 'approve',
    remark: '确认业务需求，同意采购',
    operatedAt: '2026-05-10T16:00:00Z'
  },
  {
    id: 'REC-029',
    applicationId: 'APP-013',
    nodeId: 'NODE-013-3',
    operator: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
    action: 'approve',
    remark: '预算充足，同意',
    operatedAt: '2026-05-12T10:00:00Z'
  },
  {
    id: 'REC-030',
    applicationId: 'APP-013',
    nodeId: 'NODE-013-4',
    operator: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
    action: 'approve',
    remark: '已确认供应商资质',
    operatedAt: '2026-05-13T09:00:00Z'
  },
  {
    id: 'REC-031',
    applicationId: 'APP-015',
    nodeId: 'NODE-015-1',
    operator: { id: 'user-15', name: '郑凯', department: '运营部', role: 'ops_staff' },
    action: 'submit',
    remark: '因个人事务需调休一天',
    operatedAt: '2026-05-26T11:00:00Z'
  },
  {
    id: 'REC-032',
    applicationId: 'APP-015',
    nodeId: 'NODE-015-2',
    operator: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
    action: 'reject',
    remark: '当月调休额度已用完',
    operatedAt: '2026-05-27T10:00:00Z'
  },
  {
    id: 'REC-033',
    applicationId: 'APP-016',
    nodeId: 'NODE-016-1',
    operator: { id: 'user-01', name: '张伟', department: '技术部', role: 'developer' },
    action: 'submit',
    remark: '客户拜访交通费用报销',
    operatedAt: '2026-06-04T16:00:00Z'
  },
  {
    id: 'REC-034',
    applicationId: 'APP-017',
    nodeId: 'NODE-017-1',
    operator: { id: 'user-02', name: '李娜', department: '财务部', role: 'finance_staff' },
    action: 'submit',
    remark: '营销活动物料采购申请',
    operatedAt: '2026-05-30T14:00:00Z'
  },
  {
    id: 'REC-035',
    applicationId: 'APP-017',
    nodeId: 'NODE-017-2',
    operator: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
    action: 'approve',
    remark: '同意采购',
    operatedAt: '2026-05-31T09:00:00Z'
  },
  {
    id: 'REC-036',
    applicationId: 'APP-018',
    nodeId: 'NODE-018-1',
    operator: { id: 'user-03', name: '王强', department: '市场部', role: 'marketing_staff' },
    action: 'submit',
    remark: '申请从市场部调至运营部',
    operatedAt: '2026-05-12T09:30:00Z'
  },
  {
    id: 'REC-037',
    applicationId: 'APP-018',
    nodeId: 'NODE-018-2',
    operator: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
    action: 'transfer',
    remark: '转交行政部门评估岗位需求',
    operatedAt: '2026-05-12T16:00:00Z'
  },
  {
    id: 'REC-038',
    applicationId: 'APP-018',
    nodeId: 'NODE-018-3',
    operator: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
    action: 'reject',
    remark: '运营部暂无空缺岗位，调岗不批准',
    operatedAt: '2026-05-14T10:00:00Z'
  },
  {
    id: 'REC-039',
    applicationId: 'APP-019',
    nodeId: 'NODE-019-1',
    operator: { id: 'user-04', name: '赵敏', department: '人事部', role: 'hr_staff' },
    action: 'submit',
    remark: '法定假日加班申请',
    operatedAt: '2026-05-08T08:00:00Z'
  },
  {
    id: 'REC-040',
    applicationId: 'APP-019',
    nodeId: 'NODE-019-2',
    operator: { id: 'user-09', name: '吴静', department: '人事部', role: 'hr_manager' },
    action: 'approve',
    remark: '确认加班必要性，同意',
    operatedAt: '2026-05-08T10:00:00Z'
  },
  {
    id: 'REC-041',
    applicationId: 'APP-020',
    nodeId: 'NODE-020-1',
    operator: { id: 'user-05', name: '刘洋', department: '运营部', role: 'ops_staff' },
    action: 'submit',
    remark: '婚假申请，共10天',
    operatedAt: '2026-05-06T10:00:00Z'
  },
  {
    id: 'REC-042',
    applicationId: 'APP-020',
    nodeId: 'NODE-020-2',
    operator: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
    action: 'approve',
    remark: '恭喜！婚假批准',
    operatedAt: '2026-05-06T14:00:00Z'
  },
  {
    id: 'REC-043',
    applicationId: 'APP-021',
    nodeId: 'NODE-021-1',
    operator: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
    action: 'submit',
    remark: '技术培训费用报销',
    operatedAt: '2026-05-19T13:00:00Z'
  },
  {
    id: 'REC-044',
    applicationId: 'APP-021',
    nodeId: 'NODE-021-1',
    operator: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
    action: 'withdraw',
    remark: '培训取消，撤回报销申请',
    operatedAt: '2026-05-19T15:00:00Z'
  },
  {
    id: 'REC-045',
    applicationId: 'APP-022',
    nodeId: 'NODE-022-1',
    operator: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
    action: 'submit',
    remark: '视频制作设备采购申请',
    operatedAt: '2026-06-02T10:00:00Z'
  },
  {
    id: 'REC-046',
    applicationId: 'APP-023',
    nodeId: 'NODE-023-1',
    operator: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
    action: 'submit',
    remark: '数据迁移加班申请',
    operatedAt: '2026-05-31T16:00:00Z'
  },
  {
    id: 'REC-047',
    applicationId: 'APP-023',
    nodeId: 'NODE-023-2',
    operator: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
    action: 'add_approver',
    remark: '增加技术负责人确认迁移方案',
    operatedAt: '2026-05-31T17:00:00Z'
  },
  {
    id: 'REC-048',
    applicationId: 'APP-023',
    nodeId: 'NODE-023-2',
    operator: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
    action: 'approve',
    remark: '同意加班',
    operatedAt: '2026-06-01T09:00:00Z'
  },
  {
    id: 'REC-049',
    applicationId: 'APP-025',
    nodeId: 'NODE-025-1',
    operator: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
    action: 'submit',
    remark: '申请从运营部调至市场部',
    operatedAt: '2026-05-09T10:00:00Z'
  },
  {
    id: 'REC-050',
    applicationId: 'APP-025',
    nodeId: 'NODE-025-2',
    operator: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
    action: 'approve',
    remark: '同意调岗',
    operatedAt: '2026-05-09T15:00:00Z'
  },
  {
    id: 'REC-051',
    applicationId: 'APP-025',
    nodeId: 'NODE-025-3',
    operator: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
    action: 'approve',
    remark: '行政审批通过',
    operatedAt: '2026-05-10T11:00:00Z'
  }
]
