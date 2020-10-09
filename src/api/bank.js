import request from './index';
/**
 * @desc 查询银行的操作状态
 */
export const fn_api__bank_queryBankStatus = () => {
  return request({
    url: '/system/bank/queryBankStatus',
    method: 'get'
  });
};

/**
 * @desc 银行签到
 */
export const fn_api__bank_signIn = () => {
  return request({
    url: '/system/bank/signIn',
    method: 'get'
  });
};
/**
 * @desc 银行签退
 */
export const fn_api__bank_signOut = () => {
  return request({
    url: '/system/bank/signOut',
    method: 'get'
  });
};
/**
 * @desc 对账-出入金开销户
 * @param {Object} params
 * @param {String} params.funcFlag 业务类型 1->出入金， 2->开销户
 * @param {String} params.beginDate 起始日期
 * @param {String} params.endDate 结束日期
 */
export const fn_api__bank_checkAccount = params => {
  return request({
    url: '/system/bank/checkAccount',
    method: 'get',
    params: {
      ...params
    }
  });
};
/**
 * @desc 清算
 */
export const fn_api__bank_settleAccount = () => {
  return request({
    url: '/system/bank/settleAccount',
    method: 'get'
  });
};
/**
 * @desc 查询银行清算与对账文件的进度
 * @param {Object} params
 * @param {String} params.funcFlag 业务类型 1：清算 2：余额对账 4：出入金流水 5：开销户流水对账
 * @param {String} params.beginDate 起始日期
 * @param {String} params.endDate 结束日期
 */
export const fn_api__bank_queryProgress = params => {
  return request({
    url: '/system/bank/queryProgress',
    method: 'get',
    params
  });
};
/**
 * @desc 查询银行端会员资金台帐余额
 * @param {Object} params
 * @param {String} params.selectFlag 	查询标识 1->全部， 2->普通会员子账号，3->功能子账号
 * @param {String} params.pageNum 第几页
 * @param {String} params.accountNo 账户号
 */
export const fn_api__bank_queryUserAmount = params => {
  return request({
    url: '/system/bank/queryUserAmount',
    method: 'get',
    params
  });
};
/**
 * @desc 资金汇总账号余额查询
 * @param {String} params
 */
export const fn_api__bank_queryTotalAmount = () => {
  return request({
    url: '/system/bank/queryTotalAmount',
    method: 'get'
  });
};
/**
 * @desc 查询待审核出金流水
 * @param {Object} params
 * @param {String} params.status 状态 -2 待处理/-1 待审核（已减少资金）/0 成功/1 驳回/2 冲正
 * @param {String} params.date 交易日期
 * @param {String} params.pageNum 第几页
 * @param {String} params.pageSize 一页展示几行
 */
export const fn_api__bank_queryCheckPendingCashOutFlows = (params = {}) => {
  return request({
    url: '/system/bank/queryCheckPendingCashOutFlows',
    method: 'get',
    params
  });
};
/**
 * @desc 出金审核
 * @param {Object} data
 * @param {String} data.target 发起方向 1->银行发起， 2->交易网发起
 * @param {String} data.frontLogNo 银行前置流水号
 * @param {String} data.thirdLogNo 	交易流水号
 * @param {String} data.checkFlag 审核标记，0->成功，1->驳回
 * @param {String} data.accountNo 客户账户号
 */
export const fn_api__bank_cashOutVerify = data => {
  return request({
    url: '/system/bank/cashOutVerify',
    method: 'post',
    data
  });
};
/**
 * @desc 查询对账差异流水
 * @param {object} data
 * @param {String} data.status 状态 -1->待审核，0->已处理， 1->不处理
 * @param {String} data.date 交易日期
 */
export const fn_api__bank_queryDiffFlows = (params = {}) => {
  return request({
    url: '/system/bank/queryDiffFlows',
    method: 'get',
    params
  });
};
/**
 * @desc 审核对账差异流水
 * @param {Object} params
 * @param {String} params.flowId 流水id
 * @param {String} params.checkFlag 审核标记，0 成功/1 驳回
 * @param {String} [params.operMsg] 操作信息
 */
export const fn_api__bank_operateDiffFlows = params => {
  return request({
    url: '/system/bank/operateDiffFlows',
    method: 'get',
    params
  });
};
/**
 * @desc 查询出入金对账流水
 * @param {Object} params
 * @param {String} [params.tranDate] 	交易日期
 * @param {String} [params.inoutFlag]	出金/入金，0 成功/1 驳回
 * @param {String} params.pageNum 页码
 * @param {String} params.pageSize 一页展示几行
 */
export const fn_api__bank_queryDepBankInoutss = params => {
  return request({
    url: '/system/bank/queryDepBankInouts',
    method: 'get',
    params
  });
};
/**
 * @desc 查询出入金流水
 * @param {Object} params
 * @param {String} [params.tranDate] 	交易日期
 * @param {String} [params.inoutFlag]	出金/入金，0 成功/1 驳回
 * @param {String} [params.sourceType]	关联类型 1 银行入金/2 银行出金/3 交易出金
 * @param {String} params.pageNum 页码
 * @param {String} params.pageSize 一页展示几行
 */
export const fn_api__bank_queryDepPlatInouts = params => {
  return request({
    url: '/system/bank/queryDepPlatInouts',
    method: 'get',
    params
  });
};

/**
 * @desc 查询银行入金流水
 * @param {Object} params
 * @param {String} [params.tranDate] 	交易日期
 * @param {String} [params.status]	状态，0 成功/1 驳回
 * @param {String} [params.thirdCustId]	会员编号
 * @param {String} params.pageNum 页码
 * @param {String} params.pageSize 一页展示几行
 */
export const fn_api__bank_queryDepFinFlows = params => {
  return request({
    url: '/system/bank/queryDepFinFlows',
    method: 'get',
    params
  });
};

/**
 * @desc 查询签解约流水
 * @param {Object} params
 * @param {String} [params.tranDate] 	交易日期
 * @param {String} [params.status]	状态 -2 待处理/0 成功
 * @param {String} [params.idCode]	会员证件号码
 * @param {String} [params.funcFlag]	功能标志 1 签约/2 修改/3 解约
 * @param {String} params.pageNum 页码
 * @param {String} params.pageSize 一页展示几行
 */
export const fn_api__bank_queryDepQjyFlows = params => {
  return request({
    url: '/system/bank/queryDepQjyFlows',
    method: 'get',
    params
  });
};

/**
 * @desc 查询银行开户信息
 */
export const fn_api__bank_querySysDepAccounts = () => {
  return request({
    url: '/system/bank/querySysDepAccounts',
    method: 'get'
  });
};
/**
 * @desc 查询开户登记信息
 */
export const fn_api__bank_querySysDepBooks = () => {
  return request({
    url: '/system/bank/querySysDepBooks',
    method: 'get'
  });
};

/**
 * @desc 查询银行信息
 */
export const fn_api__bank_queryDepBanks = () => {
  return request({
    url: '/system/bank/queryDepBanks',
    method: 'get'
  });
};
/**
 * @desc 更新银行信息
 */
export const fn_api__bank_updateDepBanks = params => {
  return request({
    url: '/system/bank/updateDepBanks',
    method: 'get',
    params
  });
};
/**
 * @desc 设定交易日期
 * @param {Object} params
 * @param {String} params.date
 * @param {String} params.status 状态 0 初始 4结算
 */
export const fn_api__bank_updateTranDate = params => {
  return request({
    url: '/system/bank/updateTranDate',
    method: 'get',
    params
  });
};
