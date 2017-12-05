/**
 *
 */
import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiSettleDomain;

/**
 *
 * @param {*} paramObj
 * @param {*} callback
 */
function settleReceivableAdd(paramObj, callback) {
  const url = `${apiDomain}/settle/receivable/add`;
  HTTP.post(url, paramObj, (success, error) => {
    callback(success, error);
  });
}
/**
 * 编辑应收账单
 * @param {*} paramObj
 * @param {*} callback
 */
function settleReceivableEdit(code, paramObj, callback) {
  const url = `${apiDomain}/settle/receivable/${code}/edit`;
  HTTP.post(url, paramObj, (success, error) => {
    callback(success, error);
  });
}
/**
 * 应收账单审核记录列表
 * @param {*} data
 * @param {*} callback
 */
function settleReceivableApproveList(data, callback) {
  const url = `${apiDomain}/settle/receivable/approve/list`;
  HTTP.get(url, data, callback);
}
/**
 * 应收账单详情
 * @param {*} code
 * @param {*} callback
 */
function settleReceivableGet(code, callback) {
  const url = `${apiDomain}/settle/receivable/${code}/get`;
  HTTP.get(url, {}, (success, error) => {
    callback(success, error);
  });
}
/**
 * 获取未选运单
 * @param {*} clientOrgName
 * @param {*} filter
 * @param {*} pagination
 * @param {*} callback
 */
function settleReceivableSelectReceivableWaybillList(params, callback) {
  const url = `${apiDomain}/settle/receivable/select_receivable_waybill/list`;
  HTTP.get(url, params, (success, error) => {
    callback(success, error);
  });
}
/**
 * 获取已选运单
 * @param {*} clientOrgName
 * @param {*} filter
 * @param {*} pagination
 * @param {*} callback
 */
function settleReceivableSelectSelectedWaybillList(params, callback) {
  const url = `${apiDomain}/settle/receivable/select_selected_waybill/list`;
  HTTP.get(url, params, callback);
}
/**
 * 将所选添加到已选运单
 * @param {*} data
 * @param {*} callback
 */
function settleReceivableSelectWaybill(data, callback) {
  const url = `${apiDomain}/settle/receivable/select_waybill`;
  HTTP.post(url, data, callback);
}

function settleReceivableSelectContractWaybillList(params, callback) {
  const url = `${apiDomain}/settle/receivable/select_contrast_waybill/list`;
  HTTP.get(url, params, callback);
}

/**
 * 将所选已选运单到未选
 * @param {*} data
 * @param {*} callback
 */
function settleReceivableWaybillRemove(params, callback) {
  const url = `${apiDomain}/settle/receivable/waybill/remove`;
  HTTP.post(url, params, callback);
}
/**
 * 将所有已选运单到未选
 * @param {Function} callback
 */
function settleReceivableClearSelectedWaybill(params, callback) {
  const url = `${apiDomain}/settle/receivable/clear_selected_waybill`;
  HTTP.post(url, params, callback);
}

/**
 * 获取客户对账列表
 * @param params
 * @param callback
 */
function settleReceivableSelectClientList(params, callback) {
  const url = `${apiDomain}/settle/receivable/select_client/list`;
  HTTP.get(url, params, (success, error) => {
    callback(success, error);
  });
}

/**
 *
 * @param {*} callback
 */
function settleReceivableWaybillColumns(callback) {
  const url = `${apiDomain}/list_render_info/settleReceivableWaybill/list`;
  HTTP.get(url, {}, (success) => {
    callback(success);
  });
}

/**
 *
 * @param {*} callback
 */
function settleReceivableWaybillSearch(callback) {
  const url = `${apiDomain}/search_render_info/settleReceivableWaybill/list`;
  HTTP.get(url, {}, (success) => {
    callback(success);
  });
}

/**
 *
 * @param {*} callback
 */
function settleReceivableSelectedWaybillColumns(callback) {
  const url = `${apiDomain}/list_render_info/settleReceivableSelWaybill/list`;
  HTTP.get(url, {}, (success) => {
    callback(success);
  });
}

/**
 *
 * @param {*} callback
 */
function settleReceivableSelectedWaybillSearch(callback) {
  const url = `${apiDomain}/search_render_info/settleReceivableSelWaybill/list`;
  HTTP.get(url, {}, (success) => {
    callback(success);
  });
}

/**
 * 应收账单统计信息
 * @param {*} clientOrgName
 * @param {*} callback
 */
function settleReceivableStatisticalBill(data, callback) {
  const url = `${apiDomain}/settle/receivable/statistical_bill`;
  HTTP.get(url, data, callback);
}

/**
 *
 * @param {*} callback
 */
function settleActualReceiptColumns(callback) {
  const url = `${apiDomain}/list_render_info/settleActualReceipt/list`;
  HTTP.get(url, {}, callback);
}
/**
 * 调整每单定额
 * @param {*} data
 * @param {*} callback
 */
function settleReceivableWaybillAdjustQuota(data, callback) {
  const url = `${apiDomain}/settle/receivable/waybill/adjust_quota`;
  HTTP.post(url, data, callback);
}
/**
 * 调整每单比例
 * @param {*} data
 * @param {*} callback
 */
function settleReceivableWaybillAdjustRatio(data, callback) {
  const url = `${apiDomain}/settle/receivable/waybill/adjust_proportion`;
  HTTP.post(url, data, callback);
}
/**
 * 调整结算方式
 * @param {*} data
 * @param {*} callback
 */
function settleReceivableWaybillAdjustSettleMethod(data, callback) {
  const url = `${apiDomain}/settle/receivable/waybill/adjust_settle_method`;
  HTTP.post(url, data, callback);
}
/**
 * 调整客户税率
 * @param {*} data
 * @param {*} callback
 */
function settleReceivableWaybillAdjustTaxRates(data, callback) {
  const url = `${apiDomain}/settle/receivable/waybill/adjust_tax_rate`;
  HTTP.post(url, data, callback);
}

/**
 * 调整运价税型
 * @param {*} data
 * @param {*} callback
 */
function settleReceivableWaybillAdjustTaxType(data, callback) {
  const url = `${apiDomain}/settle/receivable/waybill/adjust_tax_type`;
  HTTP.post(url, data, callback);
}
function settleReceivableWaybillEditDescription(params, callback) {
  const url = `${apiDomain}/settle/receivable/waybill/${params.code}/edit_description`;
  HTTP.post(url, { description: params.description, clientOrgName: params.clientOrgName, billCode: params.billCode }, callback);
}
/**
 * 删除过期临时表
 * @param {*} data
 * @param {*} callback
 */
function settleReceivableTempTableDelete(data, callback) {
  const url = `${apiDomain}/settle/receivable/temp_table/delete`;
  HTTP.post(url, data, callback);
}
/**
 * 导出收款记录
 * @param paramObj
 * @param callback
 */
function settleReceivableActualReceiptLogExportCsv(paramObj, callback) {
  const apiUrl = `${apiDomain}/export/settleActualReceipt`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}
/**
 * 下载错误数据的CSV文件
 */
function settleReceivableActualReceiptLogDownloadErrorData(paramObj, callback) {
  const apiUrl = `${apiDomain}/generator/settleActualReceipt`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}
/**
 * 下载CSV模板
 */
function settleReceivableActualReceiptLogDownloadTemplate(paramObj, callback) {
  const apiUrl = `${apiDomain}/download/template/settleActualReceipt`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}
/**
 * 获取列表渲染配置
 * @param callback
 */
function settleReceivableActualReceiptLogListColumn(callback) {
  const apiUrl = `${apiDomain}/list_render_info/settleActualReceipt/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    callback(res, err);
  });
}
/**
 * 获取检索条件渲染配置
 * @param callback
 */
function settleReceivableActualReceiptLogListSearch(callback) {
  const apiUrl = `${apiDomain}/search_render_info/settleActualReceipt/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    callback(res, err);
  });
}
/**
 * 收款记录列表
 * @param {*} data
 * @param {*} callback
 */
function settleReceivableActualReceiptLogList(data, callback) {
  const url = `${apiDomain}/settle/receivable/actual_receipt_log/list`;
  HTTP.get(url, data, callback);
}
/**
 * 删除收款记录
 * @param code
 * @param callback
 */
function settleReceivableActualReceiptLogDelete(code, callback) {
  const url = `${apiDomain}/settle/receivable/actual_receipt_log/${code}/delete`;
  HTTP.post(url, callback);
}
/**
 * 编辑收款记录
 * @param {*} code
 * @param {*} data
 * @param {*} callback
 */
function settleReceivableActualReceiptLogEdit(code, data, callback) {
  const url = `${apiDomain}/settle/receivable/actual_receipt_log/${code}/edit`;
  HTTP.post(url, data, callback);
}

/**
 * 收款记录详情
 * @param {*} code
 * @param {*} callback
 */
function settleReceivableActualReceiptLogGet(paramObj, callback) {
  const url = `${apiDomain}/settle/receivable/actual_receipt_log/${paramObj.code}/get`;
  HTTP.get(url, {}, callback);
}

/**
 * 复制结算运单到临时表
 * @param {*} billCode
 * @param {*} callback
 */
function settleReceivableTempWaybillCopy(billCode, callback) {
  const url = `${apiDomain}/settle/receivable/${billCode}/temp_waybill/copy`;
  HTTP.post(url, {}, callback);
}

/**
 * 应收账单列表
 * @param params
 * @param callback
 */
function settleReceivableList(params, callback) {
  const url = `${apiDomain}/settle/receivable/list`;
  HTTP.get(url, params, callback);
}

/**
 * 待审核应收账单提交审核
 * @param {*} code
 * @param {*} callback
 */
function settleReceivableApplyApprove(code, callback) {
  const url = `${apiDomain}/settle/receivable/${code}/apply_approve`;
  HTTP.post(url, {}, callback);
}

/**
 * 撤回提交审核应收账单
 * @param {*} code
 * @param {*} callback
 */
function settleReceivableRevokeApplyApprove(code, callback) {
  const url = `${apiDomain}/settle/receivable/${code}/revoke_apply_approve`;
  HTTP.post(url, {}, callback);
}

/**
 * 审核待审核应收帐单
 * @param {*} code
 * @param {*} params
 * @param {*} callback
 */
function settleReceivableApprove(code, params, callback) {
  const url = `${apiDomain}/settle/receivable/${code}/approve`;
  HTTP.post(url, params, callback);
}

/**
 * 审核待审核应收帐单
 * @param {*} code
 * @param {*} callback
 */
function settleReceivableRevokeApprove(code, callback) {
  const url = `${apiDomain}/settle/receivable/${code}/revoke_approve`;
  HTTP.post(url, {}, callback);
}

/**
 * 作废应收账单
 * @param {*} code
 * @param {*} callback
 */
function settleReceivableCancel(code, callback) {
  const url = `${apiDomain}/settle/receivable/${code}/cancel`;
  HTTP.post(url, {}, callback);
}

/**
 * 记录开票
 * @param {*} code
 * @param {*} callback
 */
function settleReceivableInvoice(code, callback) {
  const url = `${apiDomain}/settle/receivable/${code}/invoice`;
  HTTP.post(url, {}, callback);
}

/**
 * 记录开票
 * @param {*} code
 * @param {*} callback
 */
function settleReceivableActualReceiptLogAdd(params, callback) {
  const url = `${apiDomain}/settle/receivable/actual_receipt_log/add`;
  HTTP.post(url, params, callback);
}

/**
 * 获取应收账单列表展示列
 * @param {*} callback
 */
function settleReceivableListColumn(callback) {
  callback({
    code: 200,
    content: [
      {
        showName: '付款方名称', elementCode: 'label', extraParams: '{"field1":"payerOrgName"}', fieldConfigCode: 'payerOrgName'
      },
      {
        showName: '账单名称', elementCode: 'label', extraParams: '{"field1":"billName","detailLinkVisiable":"true"}', fieldConfigCode: 'billName'
      },
      {
        showName: '账单编号', elementCode: 'label', extraParams: '{"field1":"billNo","detailLinkVisiable":"true"}', fieldConfigCode: 'billNo'
      },
      {
        showName: '账单状态', elementCode: 'label', extraParams: '{"field1":"billStatus","optionsValue1":["none","pend","accept","reject","destroy"],"options1":["待提交审核","待审核","审核通过","审核不通过","已作废"]}', fieldConfigCode: 'billStatus'
      },
      {
        showName: '收款状态', elementCode: 'label', extraParams: '{"field1":"receivableStatus","optionsValue1":["none","part","all"],"options1":["未收款","部分收款","全部收款"]}', fieldConfigCode: 'receivableStatus'
      },
      {
        showName: '发票信息', elementCode: 'label', extraParams: '{"field1":"invoiced","optionsValue1":["true","false"],"options1":["已开票","未开票"]}', fieldConfigCode: 'invoiced'
      },
      {
        showName: '未收金额', elementCode: 'label', extraParams: '{"field1":"unreceivedAmount"}', fieldConfigCode: 'unreceivedAmount'
      },
      {
        showName: '应收金额', elementCode: 'label', extraParams: '{"field1":"receivableAmount"}', fieldConfigCode: 'receivableAmount'
      },
      {
        showName: '己收金额', elementCode: 'label', extraParams: '{"field1":"receivedAmount"}', fieldConfigCode: 'receivedAmount'
      },
      {
        showName: '创建人', elementCode: 'label', extraParams: '{"field1":"creatorUsername"}', fieldConfigCode: 'creatorUsername'
      },
      {
        showName: '创建时间', elementCode: 'label', extraParams: '{"field1":"createTime"}', fieldConfigCode: 'createTime'
      },
      {
        showName: '更新人用户名', elementCode: 'label', extraParams: '{"field1":"updateUsername"}', fieldConfigCode: 'updateUsername'
      },
      {
        showName: '更新时间', elementCode: 'label', extraParams: '{"field1":"updateTime"}', fieldConfigCode: 'updateTime'
      }
    ]
  });
}

function settleReceivableListSearch(callback) {
  callback({
    code: 200,
    content: [
      {
        showName: '付款方名称', elementCode: 'text', extraParams: '{"field1":"payerOrgName"}', fieldConfigCode: 'payerOrgName'
      },
      {
        showName: '账单状态', elementCode: 'select', extraParams: '{"field1":"billStatus","optionsValue1":["none","pend","accept","reject","destroy"],"options1":["待提交审核","待审核","审核通过","审核不通过","已作废"]}', fieldConfigCode: 'billStatus'
      },
      {
        showName: '收款状态', elementCode: 'select', extraParams: '{"field1":"receivableStatus","optionsValue1":["none","part","all"],"options1":["未收款","部分收款","全部收款"]}', fieldConfigCode: 'receivableStatus'
      },
      {
        showName: '账单名称', elementCode: 'text', extraParams: '{"field1":"billName"}', fieldConfigCode: 'billName'
      },
      {
        showName: '账单编号', elementCode: 'text', extraParams: '{"field1":"billNo"}', fieldConfigCode: 'billNo'
      },
      {
        showName: '创建时间', elementCode: 'dateRange', extraParams: '{"field1":"from_createTime","field3":"to_createTime","format1":"yyyy-MM-dd","format3":"yyyy-MM-dd","default2":"到"}', fieldConfigCode: 'createTime'
      },
      {
        showName: '应收金额', elementCode: 'numberRange', extraParams: '{"field1":"from_receivableAmount","field3":"to_receivableAmount","default2":"到"}', fieldConfigCode: 'receivableAmount'
      },
      {
        showName: '未收金额', elementCode: 'numberRange', extraParams: '{"field1":"from_unreceivedAmount","field3":"to_unreceivedAmount","default2":"到"}', fieldConfigCode: 'unreceivedAmount'
      }
    ]
  });
}

function settleReceivableSelectClientColumn(callback) {
  callback({
    code: 200,
    content: [
      {
        showName: '客户', elementCode: 'popSelectPartner', extraParams: '{"field1":"orgName","field2":"orgCode","field3":"orgCode"}', fieldConfigCode: 'orgName'
      },
      {
        showName: '未对账车数', elementCode: 'label', extraParams: '{"field1":"upUnsettleNum"}', fieldConfigCode: 'upUnsettleNum'
      },
      {
        showName: '最近一次对账单创建时间', elementCode: 'label', extraParams: '{"field1":"upLastSettleTime"}', fieldConfigCode: 'upLastSettleTime'
      }
    ]
  });
}

function settleReceivableSelectClientSearch(callback) {
  callback({
    code: 200,
    content: [
      {
        showName: '客户名称', elementCode: 'text', extraParams: '{"field1":"orgName"}', fieldConfigCode: 'orgName'
      }
    ]
  });
}

function settlePayableAdd(params, callback) {
  const url = `${apiDomain}/settle/payable/add`;
  HTTP.post(url, params, (success, error) => {
    callback(success, error);
  });
}

function settlePayableEdit(code, params, callback) {
  const url = `${apiDomain}/settle/payable/${code}/edit`;
  HTTP.post(url, params, (success, error) => {
    callback(success, error);
  });
}

function settlePayableApproveList(params, callback) {
  const url = `${apiDomain}/settle/payable/approve/list`;
  HTTP.get(url, params, callback);
}

function settlePayableGet(code, callback) {
  const url = `${apiDomain}/settle/payable/${code}/get`;
  HTTP.get(url, {}, (success, error) => {
    callback(success, error);
  });
}

function settlePayableSelectPayableWaybillList(params, callback) {
  const url = `${apiDomain}/settle/payable/select_payable_waybill/list`;
  HTTP.get(url, params, (success, error) => {
    callback(success, error);
  });
}

function settlePayableSelectSelectedWaybillList(params, callback) {
  const url = `${apiDomain}/settle/payable/select_selected_waybill/list`;
  HTTP.get(url, params, callback);
}

function settlePayableSelectWaybill(data, callback) {
  const url = `${apiDomain}/settle/payable/select_waybill`;
  HTTP.post(url, data, callback);
}

function settlePayableSelectContractWaybillList(params, callback) {
  const url = `${apiDomain}/settle/payable/select_contrast_waybill/list`;
  HTTP.get(url, params, callback);
}

function settlePayableWaybillRemove(params, callback) {
  const url = `${apiDomain}/settle/payable/waybill/remove`;
  HTTP.post(url, params, callback);
}

function settlePayableClearSelectedWaybill(params, callback) {
  const url = `${apiDomain}/settle/payable/clear_selected_waybill`;
  HTTP.post(url, params, callback);
}

function settlePayableSelectCarrierList(params, callback) {
  const url = `${apiDomain}/settle/payable/select_carrier/list`;
  HTTP.get(url, params, (success, error) => {
    callback(success, error);
  });
}

function settlePayableWaybillColumns(callback) {
  const url = `${apiDomain}/list_render_info/settlePayableWaybill/list`;
  HTTP.get(url, {}, (success) => {
    callback(success);
  });
}

function settlePayableWaybillSearch(callback) {
  const url = `${apiDomain}/search_render_info/settlePayableWaybill/list`;
  HTTP.get(url, {}, (success) => {
    callback(success);
  });
}

function settlePayableSelectedWaybillColumns(callback) {
  const url = `${apiDomain}/list_render_info/settlePayableSelWaybill/list`;
  HTTP.get(url, {}, (success) => {
    callback(success);
  });
}

function settlePayableSelectedWaybillSearch(callback) {
  const url = `${apiDomain}/search_render_info/settlePayableSelWaybill/list`;
  HTTP.get(url, {}, (success) => {
    callback(success);
  });
}

function settlePayableStatisticalBill(params, callback) {
  const url = `${apiDomain}/settle/payable/statistical_bill`;
  HTTP.get(url, params, callback);
}

function settleActualPaymentColumns(callback) {
  const url = `${apiDomain}/list_render_info/settleActualPayment/list`;
  HTTP.get(url, {}, callback);
}

function settlePayableWaybillAdjustQuota(params, callback) {
  const url = `${apiDomain}/settle/payable/waybill/adjust_quota`;
  HTTP.post(url, params, callback);
}

function settlePayableWaybillAdjustRatio(params, callback) {
  const url = `${apiDomain}/settle/payable/waybill/adjust_proportion`;
  HTTP.post(url, params, callback);
}

function settlePayableWaybillAdjustSettleMethod(params, callback) {
  const url = `${apiDomain}/settle/payable/waybill/adjust_settle_method`;
  HTTP.post(url, params, callback);
}

function settlePayableWaybillAdjustTaxRates(params, callback) {
  const url = `${apiDomain}/settle/payable/waybill/adjust_tax_rate`;
  HTTP.post(url, params, callback);
}

function settlePayableWaybillAdjustTaxType(params, callback) {
  const url = `${apiDomain}/settle/payable/waybill/adjust_tax_type`;
  HTTP.post(url, params, callback);
}

function settlePayableWaybillEditDescription(params, callback) {
  const url = `${apiDomain}/settle/payable/waybill/${params.code}/edit_description`;
  HTTP.post(url, { description: params.description, clientOrgName: params.clientOrgName, billCode: params.billCode }, callback);
}

function settlePayableTempTableDelete(params, callback) {
  const url = `${apiDomain}/settle/payable/temp_table/delete`;
  HTTP.post(url, params, callback);
}

function settlePayableActualPaymentLogExportCsv(params, callback) {
  const apiUrl = `${apiDomain}/export/settleActualPayment`;
  HTTP.get(apiUrl, params, (success, error) => {
    callback(success, error);
  });
}

function settlePayableActualPaymentLogDownloadErrorData(params, callback) {
  const apiUrl = `${apiDomain}/generator/settleActualPayment`;
  HTTP.post(apiUrl, params, (success, error) => {
    callback(success, error);
  });
}

function settlePayableActualPaymentLogDownloadTemplate(params, callback) {
  const apiUrl = `${apiDomain}/download/template/settleActualPayment`;
  HTTP.get(apiUrl, params, (success, error) => {
    callback(success, error);
  });
}

function settlePayableActualPaymentLogListColumn(callback) {
  const apiUrl = `${apiDomain}/list_render_info/settleActualPayment/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    callback(res, err);
  });
}

function settlePayableActualPaymentLogListSearch(callback) {
  const apiUrl = `${apiDomain}/search_render_info/settleActualPayment/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    callback(res, err);
  });
}

function settlePayableActualPaymentLogList(data, callback) {
  const url = `${apiDomain}/settle/payable/actual_payment_log/list`;
  HTTP.get(url, data, callback);
}

function settlePayableActualPaymentLogDelete(code, callback) {
  const url = `${apiDomain}/settle/payable/actual_payment_log/${code}/delete`;
  HTTP.post(url, callback);
}

function settlePayableActualPaymentLogEdit(code, data, callback) {
  const url = `${apiDomain}/settle/payable/actual_payment_log/${code}/edit`;
  HTTP.post(url, data, callback);
}

function settlePayableActualPaymentLogGet(code, callback) {
  const url = `${apiDomain}/settle/payable/actual_payment_log/${code}/get`;
  HTTP.get(url, {}, callback);
}

function settlePayableTempWaybillCopy(billCode, callback) {
  const url = `${apiDomain}/settle/payable/${billCode}/temp_waybill/copy`;
  HTTP.post(url, {}, callback);
}

function settlePayableList(params, callback) {
  const url = `${apiDomain}/settle/payable/list`;
  HTTP.get(url, params, callback);
}

function settlePayableApplyApprove(code, callback) {
  const url = `${apiDomain}/settle/payable/${code}/apply_approve`;
  HTTP.post(url, {}, callback);
}

function settlePayableRevokeApplyApprove(code, callback) {
  const url = `${apiDomain}/settle/payable/${code}/revoke_apply_approve`;
  HTTP.post(url, {}, callback);
}

function settlePayableApprove(code, params, callback) {
  const url = `${apiDomain}/settle/payable/${code}/approve`;
  HTTP.post(url, params, callback);
}

function settlePayableRevokeApprove(code, callback) {
  const url = `${apiDomain}/settle/payable/${code}/revoke_approve`;
  HTTP.post(url, {}, callback);
}

function settlePayableCancel(code, callback) {
  const url = `${apiDomain}/settle/payable/${code}/cancel`;
  HTTP.post(url, {}, callback);
}

function settlePayableReceivedInvoice(code, callback) {
  const url = `${apiDomain}/settle/payable/${code}/received_invoice`;
  HTTP.post(url, {}, callback);
}

function settlePayableActualPaymentLogAdd(params, callback) {
  const url = `${apiDomain}/settle/payable/actual_payment_log/add`;
  HTTP.post(url, params, callback);
}

function settlePayableListColumn(callback) {
  callback({
    code: 200,
    content: [
      {
        showName: '收款方名称', elementCode: 'label', extraParams: '{"field1":"payeeOrgName"}', fieldConfigCode: 'payeeOrgName'
      },
      {
        showName: '账单名称', elementCode: 'label', extraParams: '{"field1":"billName","detailLinkVisiable":"true"}', fieldConfigCode: 'billName'
      },
      {
        showName: '账单编号', elementCode: 'label', extraParams: '{"field1":"billNo","detailLinkVisiable":"true"}', fieldConfigCode: 'billNo'
      },
      {
        showName: '账单状态', elementCode: 'label', extraParams: '{"field1":"billStatus","optionsValue1":["none","pend","accept","reject","destroy"],"options1":["待提交审核","待审核","审核通过","审核不通过","已作废"]}', fieldConfigCode: 'billStatus'
      },
      {
        showName: '付款状态', elementCode: 'label', extraParams: '{"field1":"payStatus","optionsValue1":["none","part","all"],"options1":["未付款","部分付款","全部付款"]}', fieldConfigCode: 'payStatus'
      },
      {
        showName: '发票信息', elementCode: 'label', extraParams: '{"field1":"receivedInvoice","optionsValue1":["true","false"],"options1":["已收票","未收票"]}', fieldConfigCode: 'receivedInvoice'
      },
      {
        showName: '未付金额', elementCode: 'label', extraParams: '{"field1":"unpaidAmount"}', fieldConfigCode: 'unpaidAmount'
      },
      {
        showName: '应付金额', elementCode: 'label', extraParams: '{"field1":"payableAmount"}', fieldConfigCode: 'payableAmount'
      },
      {
        showName: '己付金额', elementCode: 'label', extraParams: '{"field1":"paidAmount"}', fieldConfigCode: 'paidAmount'
      },
      {
        showName: '创建人', elementCode: 'label', extraParams: '{"field1":"creatorUsername"}', fieldConfigCode: 'creatorUsername'
      },
      {
        showName: '创建时间', elementCode: 'label', extraParams: '{"field1":"createTime"}', fieldConfigCode: 'createTime'
      },
      {
        showName: '更新人用户名', elementCode: 'label', extraParams: '{"field1":"updateUsername"}', fieldConfigCode: 'updateUsername'
      },
      {
        showName: '更新时间', elementCode: 'label', extraParams: '{"field1":"updateTime"}', fieldConfigCode: 'updateTime'
      }
    ]
  });
}

function settlePayableListSearch(callback) {
  callback({
    code: 200,
    content: [
      {
        showName: '收款方名称', elementCode: 'text', extraParams: '{"field1":"payeeOrgName"}', fieldConfigCode: 'payeeOrgName'
      },
      {
        showName: '账单状态', elementCode: 'select', extraParams: '{"field1":"billStatus","optionsValue1":["none","pend","accept","reject","destroy"],"options1":["待提交审核","待审核","审核通过","审核不通过","已作废"]}', fieldConfigCode: 'billStatus'
      },
      {
        showName: '付款状态', elementCode: 'select', extraParams: '{"field1":"payStatus","optionsValue1":["none","part","all"],"options1":["未付款","部分付款","全部付款"]}', fieldConfigCode: 'payStatus'
      },
      {
        showName: '账单名称', elementCode: 'text', extraParams: '{"field1":"billName"}', fieldConfigCode: 'billName'
      },
      {
        showName: '账单编号', elementCode: 'text', extraParams: '{"field1":"billNo"}', fieldConfigCode: 'billNo'
      },
      {
        showName: '创建时间', elementCode: 'dateRange', extraParams: '{"field1":"from_createTime","field3":"to_createTime","format1":"yyyy-MM-dd","format3":"yyyy-MM-dd","default2":"到"}', fieldConfigCode: 'createTime'
      },
      {
        showName: '应付金额', elementCode: 'numberRange', extraParams: '{"field1":"from_payableAmount","field3":"to_payableAmount","default2":"到"}', fieldConfigCode: 'payableAmount'
      },
      {
        showName: '未付金额', elementCode: 'numberRange', extraParams: '{"field1":"from_unpaidAmount","field3":"to_unpaidAmount","default2":"到"}', fieldConfigCode: 'unpaidAmount'
      }
    ]
  });
}


function settlePayableSelectCarrierColumn(callback) {
  callback({
    code: 200,
    content: [
      {
        showName: '承运商', elementCode: 'popSelectPartner', extraParams: '{"field1":"orgName","field2":"orgCode","field3":"orgCode"}', fieldConfigCode: 'orgName'
      },
      {
        showName: '未对账车数', elementCode: 'label', extraParams: '{"field1":"downUnsettleNum"}', fieldConfigCode: 'downUnsettleNum'
      },
      {
        showName: '最近一次对账单创建时间', elementCode: 'label', extraParams: '{"field1":"downLastSettleTime"}', fieldConfigCode: 'downLastSettleTime'
      }
    ]
  });
}

function settlePayableSelectCarrierSearch(callback) {
  callback({
    code: 200,
    content: [
      {
        showName: '客户名称', elementCode: 'text', extraParams: '{"field1":"orgName"}', fieldConfigCode: 'orgName'
      }
    ]
  });
}

function settleOrgStatisticsRefresh(code, callback) {
  const url = `${apiDomain}/settle/org/${code}/statistics`;
  HTTP.post(url, {}, callback);
}

export {
  settleReceivableAdd,
  settleReceivableEdit,
  settleReceivableApproveList,
  settleReceivableGet,
  settleReceivableSelectReceivableWaybillList,
  settleReceivableSelectSelectedWaybillList,
  settleReceivableSelectWaybill,
  settleReceivableWaybillRemove,
  settleReceivableClearSelectedWaybill,
  settleReceivableSelectClientColumn,
  settleReceivableSelectClientSearch,
  settleReceivableSelectClientList,
  settleReceivableSelectContractWaybillList,
  settleReceivableWaybillColumns,
  settleReceivableWaybillSearch,
  settleReceivableSelectedWaybillColumns,
  settleReceivableSelectedWaybillSearch,
  settleReceivableStatisticalBill,
  settleActualReceiptColumns,
  settleReceivableWaybillAdjustQuota,
  settleReceivableWaybillAdjustRatio,
  settleReceivableWaybillAdjustSettleMethod,
  settleReceivableWaybillAdjustTaxRates,
  settleReceivableWaybillAdjustTaxType,
  settleReceivableWaybillEditDescription,
  settleReceivableTempTableDelete,
  settleReceivableActualReceiptLogExportCsv,
  settleReceivableActualReceiptLogDownloadErrorData,
  settleReceivableActualReceiptLogDownloadTemplate,
  settleReceivableActualReceiptLogListColumn,
  settleReceivableActualReceiptLogListSearch,
  settleReceivableActualReceiptLogAdd,
  settleReceivableActualReceiptLogList,
  settleReceivableActualReceiptLogDelete,
  settleReceivableActualReceiptLogEdit,
  settleReceivableActualReceiptLogGet,
  settleReceivableTempWaybillCopy,
  settleReceivableListSearch,
  settleReceivableListColumn,
  settleReceivableList,
  settleReceivableApplyApprove,
  settleReceivableRevokeApplyApprove,
  settleReceivableApprove,
  settleReceivableRevokeApprove,
  settleReceivableCancel,
  settleReceivableInvoice,
  settlePayableAdd,
  settlePayableEdit,
  settlePayableApproveList,
  settlePayableGet,
  settlePayableSelectPayableWaybillList,
  settlePayableSelectSelectedWaybillList,
  settlePayableSelectWaybill,
  settlePayableWaybillRemove,
  settlePayableClearSelectedWaybill,
  settlePayableSelectCarrierColumn,
  settlePayableSelectCarrierSearch,
  settlePayableSelectCarrierList,
  settlePayableSelectContractWaybillList,
  settlePayableWaybillColumns,
  settlePayableWaybillSearch,
  settlePayableSelectedWaybillColumns,
  settlePayableSelectedWaybillSearch,
  settlePayableStatisticalBill,
  settleActualPaymentColumns,
  settlePayableWaybillAdjustQuota,
  settlePayableWaybillAdjustRatio,
  settlePayableWaybillAdjustSettleMethod,
  settlePayableWaybillAdjustTaxRates,
  settlePayableWaybillAdjustTaxType,
  settlePayableWaybillEditDescription,
  settlePayableTempTableDelete,
  settlePayableActualPaymentLogExportCsv,
  settlePayableActualPaymentLogDownloadErrorData,
  settlePayableActualPaymentLogDownloadTemplate,
  settlePayableActualPaymentLogListColumn,
  settlePayableActualPaymentLogListSearch,
  settlePayableActualPaymentLogAdd,
  settlePayableActualPaymentLogList,
  settlePayableActualPaymentLogDelete,
  settlePayableActualPaymentLogEdit,
  settlePayableActualPaymentLogGet,
  settlePayableTempWaybillCopy,
  settlePayableListSearch,
  settlePayableListColumn,
  settlePayableList,
  settlePayableApplyApprove,
  settlePayableRevokeApplyApprove,
  settlePayableApprove,
  settlePayableRevokeApprove,
  settlePayableCancel,
  settlePayableReceivedInvoice,
  settleOrgStatisticsRefresh
};
