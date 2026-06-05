import type { ApprovalFlow } from '@/types'

export const flows: ApprovalFlow[] = [
  {
    id: 'FLOW-001',
    applicationId: 'APP-001',
    nodes: [
      {
        id: 'NODE-001-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-01', name: '张伟', department: '技术部', role: 'developer' },
        operatedAt: '2026-06-04T09:15:00Z',
        remark: '申请年假3天回乡探亲'
      },
      {
        id: 'NODE-001-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'current',
        requiredRoles: ['department_approver'],
        remark: '待分配审批人'
      },
      {
        id: 'NODE-001-3',
        order: 3,
        name: '流程结束',
        type: 'complete',
        status: 'pending',
        requiredRoles: []
      }
    ]
  },
  {
    id: 'FLOW-002',
    applicationId: 'APP-002',
    nodes: [
      {
        id: 'NODE-002-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-02', name: '李娜', department: '财务部', role: 'finance_staff' },
        operatedAt: '2026-06-02T14:30:00Z',
        remark: '部门团建费用报销申请'
      },
      {
        id: 'NODE-002-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
        operatedAt: '2026-06-03T09:00:00Z',
        remark: '同意报销'
      },
      {
        id: 'NODE-002-3',
        order: 3,
        name: '财务审批',
        type: 'finance_approve',
        status: 'approved',
        requiredRoles: ['finance_approver'],
        assignee: { id: 'user-12', name: '黄丽', department: '财务部', role: 'finance_staff' },
        operatedAt: '2026-06-03T15:00:00Z',
        remark: '费用合规，同意支付'
      },
      {
        id: 'NODE-002-4',
        order: 4,
        name: '流程结束',
        type: 'complete',
        status: 'approved',
        requiredRoles: [],
        operatedAt: '2026-06-03T16:20:00Z'
      }
    ]
  },
  {
    id: 'FLOW-003',
    applicationId: 'APP-003',
    nodes: [
      {
        id: 'NODE-003-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-03', name: '王强', department: '市场部', role: 'marketing_staff' },
        operatedAt: '2026-05-28T10:00:00Z',
        remark: '市场推广物料采购申请'
      },
      {
        id: 'NODE-003-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
        operatedAt: '2026-05-28T15:00:00Z',
        remark: '同意采购，请财务审核'
      },
      {
        id: 'NODE-003-3',
        order: 3,
        name: '财务审批',
        type: 'finance_approve',
        status: 'rejected',
        requiredRoles: ['finance_approver'],
        assignee: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
        operatedAt: '2026-05-29T11:45:00Z',
        remark: '预算超支，需补充预算说明后重新提交'
      }
    ]
  },
  {
    id: 'FLOW-004',
    applicationId: 'APP-004',
    nodes: [
      {
        id: 'NODE-004-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-04', name: '赵敏', department: '人事部', role: 'hr_staff' },
        operatedAt: '2026-05-25T08:00:00Z',
        remark: '系统上线加班申请'
      },
      {
        id: 'NODE-004-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-09', name: '吴静', department: '人事部', role: 'hr_manager' },
        operatedAt: '2026-05-25T10:30:00Z',
        remark: '同意加班安排'
      },
      {
        id: 'NODE-004-3',
        order: 3,
        name: '流程结束',
        type: 'complete',
        status: 'approved',
        requiredRoles: [],
        operatedAt: '2026-05-25T14:00:00Z'
      }
    ]
  },
  {
    id: 'FLOW-005',
    applicationId: 'APP-005',
    nodes: [
      {
        id: 'NODE-005-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-05', name: '刘洋', department: '运营部', role: 'ops_staff' },
        operatedAt: '2026-06-01T11:00:00Z',
        remark: '申请从运营部调至技术部'
      },
      {
        id: 'NODE-005-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
        operatedAt: '2026-06-01T14:00:00Z',
        remark: '同意调岗申请'
      },
      {
        id: 'NODE-005-3',
        order: 3,
        name: '行政审批',
        type: 'admin_approve',
        status: 'current',
        requiredRoles: ['super_admin'],
        remark: '等待行政审批超过48小时'
      },
      {
        id: 'NODE-005-4',
        order: 4,
        name: '流程结束',
        type: 'complete',
        status: 'pending',
        requiredRoles: []
      }
    ]
  },
  {
    id: 'FLOW-006',
    applicationId: 'APP-006',
    nodes: [
      {
        id: 'NODE-006-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
        operatedAt: '2026-06-03T16:45:00Z',
        remark: '身体检查需请假一天'
      },
      {
        id: 'NODE-006-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'current',
        requiredRoles: ['department_approver'],
        remark: '未分配审批人'
      },
      {
        id: 'NODE-006-3',
        order: 3,
        name: '流程结束',
        type: 'complete',
        status: 'pending',
        requiredRoles: []
      }
    ]
  },
  {
    id: 'FLOW-007',
    applicationId: 'APP-007',
    nodes: [
      {
        id: 'NODE-007-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
        operatedAt: '2026-05-20T09:00:00Z',
        remark: '北京出差差旅费用报销'
      },
      {
        id: 'NODE-007-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
        operatedAt: '2026-05-20T11:00:00Z',
        remark: '确认出差事项'
      },
      {
        id: 'NODE-007-3',
        order: 3,
        name: '财务审批',
        type: 'finance_approve',
        status: 'approved',
        requiredRoles: ['finance_approver'],
        assignee: { id: 'user-12', name: '黄丽', department: '财务部', role: 'finance_staff' },
        operatedAt: '2026-05-22T09:30:00Z',
        remark: '发票核实无误，同意报销'
      },
      {
        id: 'NODE-007-4',
        order: 4,
        name: '流程结束',
        type: 'complete',
        status: 'approved',
        requiredRoles: [],
        operatedAt: '2026-05-22T10:30:00Z'
      }
    ]
  },
  {
    id: 'FLOW-008',
    applicationId: 'APP-008',
    nodes: [
      {
        id: 'NODE-008-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
        operatedAt: '2026-06-01T13:00:00Z',
        remark: '采购笔记本电脑5台'
      },
      {
        id: 'NODE-008-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'current',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
        remark: '审批超时，等待超过48小时'
      },
      {
        id: 'NODE-008-3',
        order: 3,
        name: '财务审批',
        type: 'finance_approve',
        status: 'pending',
        requiredRoles: ['finance_approver']
      },
      {
        id: 'NODE-008-4',
        order: 4,
        name: '流程结束',
        type: 'complete',
        status: 'pending',
        requiredRoles: []
      }
    ]
  },
  {
    id: 'FLOW-009',
    applicationId: 'APP-009',
    nodes: [
      {
        id: 'NODE-009-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-09', name: '吴静', department: '人事部', role: 'hr_manager' },
        operatedAt: '2026-05-22T15:30:00Z',
        remark: '季度结算加班申请'
      },
      {
        id: 'NODE-009-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'rejected',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-09', name: '吴静', department: '人事部', role: 'hr_manager' },
        operatedAt: '2026-05-23T09:15:00Z',
        remark: '加班人员已满额，请调整排班'
      }
    ]
  },
  {
    id: 'FLOW-010',
    applicationId: 'APP-010',
    nodes: [
      {
        id: 'NODE-010-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
        operatedAt: '2026-05-18T10:20:00Z',
        remark: '家人婚礼请假两天'
      },
      {
        id: 'NODE-010-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'skipped',
        requiredRoles: ['department_approver']
      },
      {
        id: 'NODE-010-3',
        order: 3,
        name: '流程结束',
        type: 'complete',
        status: 'skipped',
        requiredRoles: []
      }
    ]
  },
  {
    id: 'FLOW-011',
    applicationId: 'APP-011',
    nodes: [
      {
        id: 'NODE-011-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-11', name: '马超', department: '技术部', role: 'developer' },
        operatedAt: '2026-05-15T08:30:00Z',
        remark: '申请从技术岗位调至产品岗位'
      },
      {
        id: 'NODE-011-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
        operatedAt: '2026-05-15T14:00:00Z',
        remark: '同意调岗'
      },
      {
        id: 'NODE-011-3',
        order: 3,
        name: '行政审批',
        type: 'admin_approve',
        status: 'approved',
        requiredRoles: ['super_admin'],
        assignee: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
        operatedAt: '2026-05-16T10:00:00Z',
        remark: '行政手续已办理'
      },
      {
        id: 'NODE-011-4',
        order: 4,
        name: '流程结束',
        type: 'complete',
        status: 'approved',
        requiredRoles: [],
        operatedAt: '2026-05-17T16:00:00Z'
      }
    ]
  },
  {
    id: 'FLOW-012',
    applicationId: 'APP-012',
    nodes: [
      {
        id: 'NODE-012-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-12', name: '黄丽', department: '财务部', role: 'finance_staff' },
        operatedAt: '2026-06-03T10:00:00Z',
        remark: '办公用品采购报销'
      },
      {
        id: 'NODE-012-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
        operatedAt: '2026-06-03T14:00:00Z',
        remark: '同意'
      },
      {
        id: 'NODE-012-3',
        order: 3,
        name: '财务审批',
        type: 'finance_approve',
        status: 'current',
        requiredRoles: ['finance_approver'],
        assignee: { id: 'user-12', name: '黄丽', department: '财务部', role: 'finance_staff' },
        remark: '财务复核中'
      }
    ]
  },
  {
    id: 'FLOW-013',
    applicationId: 'APP-013',
    nodes: [
      {
        id: 'NODE-013-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-13', name: '林浩', department: '市场部', role: 'marketing_staff' },
        operatedAt: '2026-05-10T09:00:00Z',
        remark: '服务器设备采购申请'
      },
      {
        id: 'NODE-013-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
        operatedAt: '2026-05-10T16:00:00Z',
        remark: '确认业务需求，同意采购'
      },
      {
        id: 'NODE-013-3',
        order: 3,
        name: '财务审批',
        type: 'finance_approve',
        status: 'approved',
        requiredRoles: ['finance_approver'],
        assignee: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
        operatedAt: '2026-05-12T10:00:00Z',
        remark: '预算充足，同意'
      },
      {
        id: 'NODE-013-4',
        order: 4,
        name: '行政审批',
        type: 'admin_approve',
        status: 'approved',
        requiredRoles: ['super_admin'],
        assignee: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
        operatedAt: '2026-05-13T09:00:00Z',
        remark: '已确认供应商资质'
      },
      {
        id: 'NODE-013-5',
        order: 5,
        name: '流程结束',
        type: 'complete',
        status: 'approved',
        requiredRoles: [],
        operatedAt: '2026-05-13T15:30:00Z'
      }
    ]
  },
  {
    id: 'FLOW-014',
    applicationId: 'APP-014',
    nodes: [
      {
        id: 'NODE-014-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'current',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-14', name: '徐婷', department: '人事部', role: 'hr_staff' }
      }
    ]
  },
  {
    id: 'FLOW-015',
    applicationId: 'APP-015',
    nodes: [
      {
        id: 'NODE-015-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-15', name: '郑凯', department: '运营部', role: 'ops_staff' },
        operatedAt: '2026-05-26T11:00:00Z',
        remark: '因个人事务需调休一天'
      },
      {
        id: 'NODE-015-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'rejected',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
        operatedAt: '2026-05-27T10:00:00Z',
        remark: '当月调休额度已用完'
      }
    ]
  },
  {
    id: 'FLOW-016',
    applicationId: 'APP-016',
    nodes: [
      {
        id: 'NODE-016-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-01', name: '张伟', department: '技术部', role: 'developer' },
        operatedAt: '2026-06-04T16:00:00Z',
        remark: '客户拜访交通费用报销'
      },
      {
        id: 'NODE-016-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'current',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' }
      }
    ]
  },
  {
    id: 'FLOW-017',
    applicationId: 'APP-017',
    nodes: [
      {
        id: 'NODE-017-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-02', name: '李娜', department: '财务部', role: 'finance_staff' },
        operatedAt: '2026-05-30T14:00:00Z',
        remark: '营销活动物料采购申请'
      },
      {
        id: 'NODE-017-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
        operatedAt: '2026-05-31T09:00:00Z',
        remark: '同意采购'
      },
      {
        id: 'NODE-017-3',
        order: 3,
        name: '财务审批',
        type: 'finance_approve',
        status: 'current',
        requiredRoles: ['finance_approver'],
        assignee: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
        remark: '大额采购需详细审核'
      }
    ]
  },
  {
    id: 'FLOW-018',
    applicationId: 'APP-018',
    nodes: [
      {
        id: 'NODE-018-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-03', name: '王强', department: '市场部', role: 'marketing_staff' },
        operatedAt: '2026-05-12T09:30:00Z',
        remark: '申请从市场部调至运营部'
      },
      {
        id: 'NODE-018-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
        operatedAt: '2026-05-12T16:00:00Z',
        remark: '同意调岗'
      },
      {
        id: 'NODE-018-3',
        order: 3,
        name: '行政审批',
        type: 'admin_approve',
        status: 'rejected',
        requiredRoles: ['super_admin'],
        assignee: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
        operatedAt: '2026-05-14T10:00:00Z',
        remark: '运营部暂无空缺岗位，调岗不批准'
      }
    ]
  },
  {
    id: 'FLOW-019',
    applicationId: 'APP-019',
    nodes: [
      {
        id: 'NODE-019-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-04', name: '赵敏', department: '人事部', role: 'hr_staff' },
        operatedAt: '2026-05-08T08:00:00Z',
        remark: '法定假日加班申请'
      },
      {
        id: 'NODE-019-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-09', name: '吴静', department: '人事部', role: 'hr_manager' },
        operatedAt: '2026-05-08T10:00:00Z',
        remark: '确认加班必要性，同意'
      },
      {
        id: 'NODE-019-3',
        order: 3,
        name: '流程结束',
        type: 'complete',
        status: 'approved',
        requiredRoles: [],
        operatedAt: '2026-05-08T12:00:00Z'
      }
    ]
  },
  {
    id: 'FLOW-020',
    applicationId: 'APP-020',
    nodes: [
      {
        id: 'NODE-020-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-05', name: '刘洋', department: '运营部', role: 'ops_staff' },
        operatedAt: '2026-05-06T10:00:00Z',
        remark: '婚假申请，共10天'
      },
      {
        id: 'NODE-020-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
        operatedAt: '2026-05-06T14:00:00Z',
        remark: '恭喜！婚假批准'
      },
      {
        id: 'NODE-020-3',
        order: 3,
        name: '流程结束',
        type: 'complete',
        status: 'approved',
        requiredRoles: [],
        operatedAt: '2026-05-06T15:30:00Z'
      }
    ]
  },
  {
    id: 'FLOW-021',
    applicationId: 'APP-021',
    nodes: [
      {
        id: 'NODE-021-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
        operatedAt: '2026-05-19T13:00:00Z',
        remark: '技术培训费用报销'
      },
      {
        id: 'NODE-021-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'skipped',
        requiredRoles: ['department_approver']
      },
      {
        id: 'NODE-021-3',
        order: 3,
        name: '财务审批',
        type: 'finance_approve',
        status: 'skipped',
        requiredRoles: ['finance_approver']
      }
    ]
  },
  {
    id: 'FLOW-022',
    applicationId: 'APP-022',
    nodes: [
      {
        id: 'NODE-022-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' },
        operatedAt: '2026-06-02T10:00:00Z',
        remark: '视频制作设备采购申请'
      },
      {
        id: 'NODE-022-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'current',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-07', name: '杨芳', department: '财务部', role: 'finance_manager' }
      },
      {
        id: 'NODE-022-3',
        order: 3,
        name: '财务审批',
        type: 'finance_approve',
        status: 'pending',
        requiredRoles: ['finance_approver']
      },
      {
        id: 'NODE-022-4',
        order: 4,
        name: '行政审批',
        type: 'admin_approve',
        status: 'pending',
        requiredRoles: ['super_admin']
      }
    ]
  },
  {
    id: 'FLOW-023',
    applicationId: 'APP-023',
    nodes: [
      {
        id: 'NODE-023-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
        operatedAt: '2026-05-31T16:00:00Z',
        remark: '数据迁移加班申请'
      },
      {
        id: 'NODE-023-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-08', name: '周明', department: '市场部', role: 'marketing_manager' },
        operatedAt: '2026-06-01T09:00:00Z',
        remark: '同意加班'
      },
      {
        id: 'NODE-023-3',
        order: 3,
        name: '流程结束',
        type: 'complete',
        status: 'current',
        requiredRoles: []
      }
    ]
  },
  {
    id: 'FLOW-024',
    applicationId: 'APP-024',
    nodes: [
      {
        id: 'NODE-024-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'current',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-09', name: '吴静', department: '人事部', role: 'hr_manager' }
      },
      {
        id: 'NODE-024-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'pending',
        requiredRoles: ['department_approver']
      },
      {
        id: 'NODE-024-3',
        order: 3,
        name: '流程结束',
        type: 'complete',
        status: 'pending',
        requiredRoles: []
      }
    ]
  },
  {
    id: 'FLOW-025',
    applicationId: 'APP-025',
    nodes: [
      {
        id: 'NODE-025-1',
        order: 1,
        name: '提交申请',
        type: 'submit',
        status: 'approved',
        requiredRoles: ['applicant'],
        assignee: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
        operatedAt: '2026-05-09T10:00:00Z',
        remark: '申请从运营部调至市场部'
      },
      {
        id: 'NODE-025-2',
        order: 2,
        name: '部门主管审批',
        type: 'department_approve',
        status: 'approved',
        requiredRoles: ['department_approver'],
        assignee: { id: 'user-10', name: '孙磊', department: '运营部', role: 'ops_manager' },
        operatedAt: '2026-05-09T15:00:00Z',
        remark: '同意调岗'
      },
      {
        id: 'NODE-025-3',
        order: 3,
        name: '行政审批',
        type: 'admin_approve',
        status: 'approved',
        requiredRoles: ['super_admin'],
        assignee: { id: 'user-06', name: '陈刚', department: '技术部', role: 'tech_lead' },
        operatedAt: '2026-05-10T11:00:00Z',
        remark: '行政审批通过'
      },
      {
        id: 'NODE-025-4',
        order: 4,
        name: '流程结束',
        type: 'complete',
        status: 'approved',
        requiredRoles: [],
        operatedAt: '2026-05-11T14:00:00Z'
      }
    ]
  }
]
