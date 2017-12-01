
import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiReportDomain;

const Decimal = require('./decimal.min');

/**
 * 获取单车汇总字段
 */
function singleCarSummaryColumn(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '车牌号',
        fieldConfigCode: 'truckNo',
        elementCode: 'label',
        extraParams: '{"field1": "truckNo", "required": "false"}'
      },
      {
        showName: '车次',
        fieldConfigCode: 'vehicleTimes',
        elementCode: 'label',
        extraParams: '{"field1": "vehicleTimes", "required": "false"}'
      },
      {
        showName: '结算重量',
        fieldConfigCode: 'settleWeight',
        elementCode: 'label',
        extraParams: '{"field1": "settleWeight", "required": "false"}'
      },
      {
        showName: '结算体积',
        fieldConfigCode: 'settleVolume',
        elementCode: 'label',
        extraParams: '{"field1": "settleVolume", "required": "false"}'
      },
      {
        showName: '结算数量',
        fieldConfigCode: 'settleNum',
        elementCode: 'label',
        extraParams: '{"field1": "settleNum", "required": "false"}'
      },
      {
        showName: '运输里程数',
        fieldConfigCode: 'transportMileage',
        elementCode: 'label',
        extraParams: '{"field1": "transportMileage", "required": "false"}'
      },
      {
        showName: '货差扣款',
        fieldConfigCode: 'settleLossDeduction',
        elementCode: 'label',
        extraParams: '{"field1": "settleLossDeduction", "required": "false"}'
      },
      {
        showName: '应收客户费用',
        fieldConfigCode: 'settleClientOrgPayee',
        elementCode: 'label',
        extraParams: '{"field1": "settleClientOrgPayee", "required": "false"}'
      },
      {
        showName: '运输成本费用',
        fieldConfigCode: 'settleTransportationCost',
        elementCode: 'label',
        extraParams: '{"field1": "settleTransportationCost", "required": "false"}'
      },
      {
        showName: '预计毛利',
        fieldConfigCode: 'settleGrossProfit',
        elementCode: 'label',
        extraParams: '{"field1": "settleGrossProfit", "required": "false"}'
      }
    ] };
  callback(success);
  return success;
}
/**
 * 获取单车汇总搜索字段
 */
function singleCarSummarySearch(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '出车日期',
        fieldConfigCode: 'departDate',
        elementCode: 'dateRange',
        extraParams: '{"field1":"from_departDate","field3":"to_departDate","format1":"yyyy-MM-dd","format3":"yyyy-MM-dd","default2":"到"}'
      },
      {
        showName: '收车日期',
        fieldConfigCode: 'returnDate',
        elementCode: 'dateRange',
        extraParams: '{"field1":"from_returnDate","field3":"to_returnDate","format1":"yyyy-MM-dd","format3":"yyyy-MM-dd","default2":"到"}'
      },
      {
        showName: '车牌号',
        fieldConfigCode: 'truckNo',
        elementCode: 'text',
        extraParams: '{"field1": "truckNo"}'
      }
    ] };
  callback(success);
  return success;
}

/**
 * 获取单车汇总列表
 */
function singleCarSummaryList(paramObj, callback) {
  const apiUrl = `${apiDomain}/report/single_car_summary/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    let tempData = [],
      vehicleTimes = Decimal(0),
      settleWeight = Decimal(0),
      settleVolume = Decimal(0),
      settleNum = Decimal(0),
      transportMileage = Decimal(0),
      settleLossDeduction = Decimal(0),
      settleClientOrgPayee = Decimal(0),
      settleTransportationCost = Decimal(0),
      settleGrossProfit = Decimal(0);
    if (success.content.length) {
      tempData = success.content;
      tempData.forEach((data) => {
        vehicleTimes = vehicleTimes.plus(data.vehicleTimes || 0);
        settleWeight = settleWeight.plus(data.settleWeight || 0);
        settleVolume = settleVolume.plus(data.settleVolume || 0);
        settleNum = settleNum.plus(data.settleNum || 0);
        transportMileage = transportMileage.plus(data.transportMileage || 0);
        settleLossDeduction = settleLossDeduction.plus(data.settleLossDeduction || 0);
        settleClientOrgPayee = settleClientOrgPayee.plus(data.settleClientOrgPayee || 0);
        settleTransportationCost = settleTransportationCost.plus(data.settleTransportationCost || 0);
        settleGrossProfit = settleGrossProfit.plus(data.settleGrossProfit || 0);
      });
    }
    tempData.push({ 'truckNo': '合计',
      'vehicleTimes': vehicleTimes.toNumber(),
      'settleWeight': settleWeight.toNumber(),
      'settleVolume': settleVolume.toNumber(),
      'settleNum': settleNum.toNumber(),
      'transportMileage': transportMileage.toNumber(),
      'settleLossDeduction': settleLossDeduction.toNumber(),
      'settleClientOrgPayee': settleClientOrgPayee.toNumber(),
      'settleTransportationCost': settleTransportationCost.toNumber(),
      'settleGrossProfit': settleGrossProfit.toNumber() });
    success.content = tempData;
    callback(success, error);
  });
}

/**
 * 获取客户汇总字段
 */
function customerSummaryColumn(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '托运客户',
        fieldConfigCode: 'clientOrgName',
        elementCode: 'label',
        extraParams: '{"field1": "clientOrgName", "required": "false"}'
      },
      {
        showName: '车次',
        fieldConfigCode: 'vehicleTimes',
        elementCode: 'label',
        extraParams: '{"field1": "vehicleTimes", "required": "false"}'
      },
      {
        showName: '结算重量',
        fieldConfigCode: 'settleWeight',
        elementCode: 'label',
        extraParams: '{"field1": "settleWeight", "required": "false"}'
      },
      {
        showName: '结算体积',
        fieldConfigCode: 'settleVolume',
        elementCode: 'label',
        extraParams: '{"field1": "settleVolume", "required": "false"}'
      },
      {
        showName: '结算数量',
        fieldConfigCode: 'settleNum',
        elementCode: 'label',
        extraParams: '{"field1": "settleNum", "required": "false"}'
      },
      {
        showName: '应收客户费用',
        fieldConfigCode: 'settleClientOrgPayee',
        elementCode: 'label',
        extraParams: '{"field1": "settleClientOrgPayee", "required": "false"}'
      },
      {
        showName: '货差扣款',
        fieldConfigCode: 'settleLossDeduction',
        elementCode: 'label',
        extraParams: '{"field1": "settleLossDeduction", "required": "false"}'
      },
      {
        showName: '运输成本费用',
        fieldConfigCode: 'settleTransportationCost',
        elementCode: 'label',
        extraParams: '{"field1": "settleTransportationCost", "required": "false"}'
      },
      {
        showName: '预计毛利',
        fieldConfigCode: 'settleGrossProfit',
        elementCode: 'label',
        extraParams: '{"field1": "settleGrossProfit", "required": "false"}'
      }
    ] };
  callback(success);
  return success;
}
/**
 * 获取客户汇总搜索字段
 */
function customerSummarySearch(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '装货日期',
        fieldConfigCode: 'loadingDate',
        elementCode: 'dateRange',
        extraParams: '{"field1":"from_loadingDate","field3":"to_loadingDate","format1":"yyyy-MM-dd","format3":"yyyy-MM-dd","default2":"到"}'
      },
      {
        showName: '卸货日期',
        fieldConfigCode: 'unloadingDate',
        elementCode: 'dateRange',
        extraParams: '{"field1":"from_unloadingDate","field3":"to_unloadingDate","format1":"yyyy-MM-dd","format3":"yyyy-MM-dd","default2":"到"}'
      },
      {
        showName: '托运客户',
        fieldConfigCode: 'clientOrgName',
        elementCode: 'text',
        extraParams: '{"field1": "clientOrgName"}'
      }
    ] };
  callback(success);
  return success;
}

/**
 * 获取客户汇总列表
 */
function customerSummaryList(paramObj, callback) {
  const apiUrl = `${apiDomain}/report/customer_summary/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    let tempData = [],
      vehicleTimes = Decimal(0),
      settleWeight = Decimal(0),
      settleVolume = Decimal(0),
      settleNum = Decimal(0),
      settleLossDeduction = Decimal(0),
      settleClientOrgPayee = Decimal(0),
      settleTransportationCost = Decimal(0),
      settleGrossProfit = Decimal(0);
    if (success.content.length) {
      tempData = success.content;
      tempData.forEach((data) => {
        vehicleTimes = vehicleTimes.plus(data.vehicleTimes || 0);
        settleWeight = settleWeight.plus(data.settleWeight || 0);
        settleVolume = settleVolume.plus(data.settleVolume || 0);
        settleNum = settleNum.plus(data.settleNum || 0);
        settleLossDeduction = settleLossDeduction.plus(data.settleLossDeduction || 0);
        settleClientOrgPayee = settleClientOrgPayee.plus(data.settleClientOrgPayee || 0);
        settleTransportationCost = settleTransportationCost.plus(data.settleTransportationCost || 0);
        settleGrossProfit = settleGrossProfit.plus(data.settleGrossProfit || 0);
      });
    }
    tempData.push({ 'clientOrgName': '合计',
      'vehicleTimes': vehicleTimes.toNumber(),
      'settleWeight': settleWeight.toNumber(),
      'settleVolume': settleVolume.toNumber(),
      'settleNum': settleNum.toNumber(),
      'settleLossDeduction': settleLossDeduction.toNumber(),
      'settleClientOrgPayee': settleClientOrgPayee.toNumber(),
      'settleTransportationCost': settleTransportationCost.toNumber(),
      'settleGrossProfit': settleGrossProfit.toNumber() });
    success.content = tempData;
    callback(success, error);
  });
}

/**
 * 获取线路汇总字段
 */
function lineSummaryColumn(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '线路名称',
        fieldConfigCode: 'lineName',
        elementCode: 'label',
        extraParams: '{"field1": "lineName", "required": "false"}'
      },
      {
        showName: '货物名称',
        fieldConfigCode: 'goodsName',
        elementCode: 'label',
        extraParams: '{"field1": "goodsName", "required": "false"}'
      },
      {
        showName: '车次',
        fieldConfigCode: 'vehicleTimes',
        elementCode: 'label',
        extraParams: '{"field1": "vehicleTimes", "required": "false"}'
      },
      {
        showName: '结算重量',
        fieldConfigCode: 'settleWeight',
        elementCode: 'label',
        extraParams: '{"field1": "settleWeight", "required": "false"}'
      },
      {
        showName: '结算体积',
        fieldConfigCode: 'settleVolume',
        elementCode: 'label',
        extraParams: '{"field1": "settleVolume", "required": "false"}'
      },
      {
        showName: '结算数量',
        fieldConfigCode: 'settleNum',
        elementCode: 'label',
        extraParams: '{"field1": "settleNum", "required": "false"}'
      },
      {
        showName: '货差扣款',
        fieldConfigCode: 'settleLossDeduction',
        elementCode: 'label',
        extraParams: '{"field1": "settleLossDeduction", "required": "false"}'
      },
      {
        showName: '应收客户费用',
        fieldConfigCode: 'settleClientOrgPayee',
        elementCode: 'label',
        extraParams: '{"field1": "settleClientOrgPayee", "required": "false"}'
      },
      {
        showName: '运输成本费用',
        fieldConfigCode: 'settleTransportationCost',
        elementCode: 'label',
        extraParams: '{"field1": "settleTransportationCost", "required": "false"}'
      },
      {
        showName: '预计毛利',
        fieldConfigCode: 'settleGrossProfit',
        elementCode: 'label',
        extraParams: '{"field1": "settleGrossProfit", "required": "false"}'
      }
    ] };
  callback(success);
  return success;
}
/**
 * 获取线路汇总搜索字段
 */
function lineSummarySearch(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '装货日期',
        fieldConfigCode: 'loadingDate',
        elementCode: 'dateRange',
        extraParams: '{"field1":"from_loadingDate","field3":"to_loadingDate","format1":"yyyy-MM-dd","format3":"yyyy-MM-dd","default2":"到"}'
      },
      {
        showName: '卸货日期',
        fieldConfigCode: 'unloadingDate',
        elementCode: 'dateRange',
        extraParams: '{"field1":"from_unloadingDate","field3":"to_unloadingDate","format1":"yyyy-MM-dd","format3":"yyyy-MM-dd","default2":"到"}'
      },
      {
        showName: '线路名称',
        fieldConfigCode: 'lineName',
        elementCode: 'text',
        extraParams: '{"field1": "lineName"}'
      },
      {
        showName: '货物名称',
        fieldConfigCode: 'goodsName',
        elementCode: 'text',
        extraParams: '{"field1": "goodsName"}'
      }
    ] };
  callback(success);
  return success;
}

/**
 * 获取线路汇总列表
 */
function lineSummaryList(paramObj, callback) {
  const apiUrl = `${apiDomain}/report/line_summary/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    let tempData = [],
      vehicleTimes = Decimal(0),
      settleWeight = Decimal(0),
      settleVolume = Decimal(0),
      settleNum = Decimal(0),
      settleLossDeduction = Decimal(0),
      settleClientOrgPayee = Decimal(0),
      settleTransportationCost = Decimal(0),
      settleGrossProfit = Decimal(0);
    if (success.content.length) {
      tempData = success.content;
      tempData.forEach((data) => {
        vehicleTimes = vehicleTimes.plus(data.vehicleTimes || 0);
        settleWeight = settleWeight.plus(data.settleWeight || 0);
        settleVolume = settleVolume.plus(data.settleVolume || 0);
        settleNum = settleNum.plus(data.settleNum || 0);
        settleLossDeduction = settleLossDeduction.plus(data.settleLossDeduction || 0);
        settleClientOrgPayee = settleClientOrgPayee.plus(data.settleClientOrgPayee || 0);
        settleTransportationCost = settleTransportationCost.plus(data.settleTransportationCost || 0);
        settleGrossProfit = settleGrossProfit.plus(data.settleGrossProfit || 0);
      });
    }
    tempData.push({ 'lineName': '合计',
      'vehicleTimes': vehicleTimes.toNumber(),
      'settleWeight': settleWeight.toNumber(),
      'settleVolume': settleVolume.toNumber(),
      'settleNum': settleNum.toNumber(),
      'settleLossDeduction': settleLossDeduction.toNumber(),
      'settleClientOrgPayee': settleClientOrgPayee.toNumber(),
      'settleTransportationCost': settleTransportationCost.toNumber(),
      'settleGrossProfit': settleGrossProfit.toNumber() });
    success.content = tempData;
    callback(success, error);
  });
}

/**
 * 获取司机汇总字段
 */
function driverSummaryColumn(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '司机',
        fieldConfigCode: 'driverName',
        elementCode: 'label',
        extraParams: '{"field1": "driverName", "required": "false"}'
      },
      {
        showName: '手机号',
        fieldConfigCode: 'driverPhone',
        elementCode: 'label',
        extraParams: '{"field1": "driverPhone", "required": "false"}'
      },
      {
        showName: '主驾出车次数',
        fieldConfigCode: 'driverLeaveVehicleTimes',
        elementCode: 'label',
        extraParams: '{"field1": "driverLeaveVehicleTimes", "required": "false"}'
      },
      {
        showName: '副驾出车次数',
        fieldConfigCode: 'viceDriverLeaveVehicleTimes',
        elementCode: 'label',
        extraParams: '{"field1": "viceDriverLeaveVehicleTimes", "required": "false"}'
      },
      {
        showName: '运输里程数',
        fieldConfigCode: 'transportMileage',
        elementCode: 'label',
        extraParams: '{"field1": "transportMileage", "required": "false"}'
      },
      {
        showName: '主驾费用',
        fieldConfigCode: 'driverAmount',
        elementCode: 'label',
        extraParams: '{"field1": "driverAmount", "required": "false"}'
      },
      {
        showName: '副驾费用',
        fieldConfigCode: 'viceDriverAmount',
        elementCode: 'label',
        extraParams: '{"field1": "viceDriverAmount", "required": "false"}'
      }
    ] };
  callback(success);
  return success;
}
/**
 * 获取司机汇总搜索字段
 */
function driverSummarySearch(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '出车日期',
        fieldConfigCode: 'departDate',
        elementCode: 'dateRange',
        extraParams: '{"field1":"from_departDate","field3":"to_departDate","format1":"yyyy-MM-dd","format3":"yyyy-MM-dd","default2":"到"}'
      },
      {
        showName: '收车日期',
        fieldConfigCode: 'returnDate',
        elementCode: 'dateRange',
        extraParams: '{"field1":"from_returnDate","field3":"to_returnDate","format1":"yyyy-MM-dd","format3":"yyyy-MM-dd","default2":"到"}'
      },
      {
        showName: '司机',
        fieldConfigCode: 'driverName',
        elementCode: 'text',
        extraParams: '{"field1": "driverName"}'
      }
    ] };
  callback(success);
  return success;
}

/**
 * 获取司机汇总列表
 */
function driverSummaryList(paramObj, callback) {
  const apiUrl = `${apiDomain}/report/driver_summary/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    let tempData = [],
      driverLeaveVehicleTimes = Decimal(0),
      viceDriverLeaveVehicleTimes = Decimal(0),
      transportMileage = Decimal(0),
      driverAmount = Decimal(0),
      viceDriverAmount = Decimal(0);
    if (success.content.length) {
      tempData = success.content;
      tempData.forEach((data) => {
        driverLeaveVehicleTimes = driverLeaveVehicleTimes.plus(data.driverLeaveVehicleTimes || 0);
        viceDriverLeaveVehicleTimes = viceDriverLeaveVehicleTimes.plus(data.viceDriverLeaveVehicleTimes || 0);
        transportMileage = transportMileage.plus(data.transportMileage || 0);
        driverAmount = driverAmount.plus(data.driverAmount || 0);
        viceDriverAmount = viceDriverAmount.plus(data.viceDriverAmount || 0);
      });
    }
    tempData.push({ 'driverName': '合计',
      'driverLeaveVehicleTimes': driverLeaveVehicleTimes.toNumber(),
      'viceDriverLeaveVehicleTimes': viceDriverLeaveVehicleTimes.toNumber(),
      'transportMileage': transportMileage.toNumber(),
      'driverAmount': driverAmount.toNumber(),
      'viceDriverAmount': viceDriverAmount.toNumber()});
    success.content = tempData;
    callback(success, error);
  });
}

/**
 * 获取云图汇总
 */
function screenSummary(paramObj, callback) {
  const apiUrl = `${apiDomain}/report/screen/summary`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取云图线路列表
 */
function screenLineSummary(paramObj, callback) {
  const apiUrl = `${apiDomain}/report/screen/line_summary`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取云图货物列表
 */
function screenGoodsSummary(paramObj, callback) {
  const apiUrl = `${apiDomain}/report/screen/goods_summary`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取收发货直播
 */
function screenTransportLive(paramObj, callback) {
  const apiUrl = `${apiDomain}/report/screen/transport_live`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { singleCarSummaryColumn, singleCarSummarySearch, singleCarSummaryList,
customerSummaryColumn, customerSummarySearch, customerSummaryList,
lineSummaryColumn, lineSummarySearch, lineSummaryList,
driverSummaryColumn, driverSummarySearch, driverSummaryList,
screenSummary, screenLineSummary, screenGoodsSummary, screenTransportLive };
