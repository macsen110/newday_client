/**
 * Created by zhuyi on 17/5/2.
 */
// const config = require('../config');
// const url = process.env.NODE_ENV === "development"?config.dev.url:config.build.url;
const domain = process.env.rltx;
// 登录
module.exports = {
  apiDomain: `${domain}/account`,
// 组织
  apiOrgDomain: `${domain}/org`,
// 组织配置
  apiOrgConfigDomain: `${domain}/org-config`,
// 车
  apiTruckDomain: `${domain}/truck`,
// 挂车
  apiTrailerDomain: `${domain}/trailer`,
// 设备
  apiLbsDomain: `${domain}/lbs`,
// 设备绑定
  apiOprLbsDomain: `${domain}/opr-lbs`,
// 人
  apiPersonDomain: `${domain}/person`,
// 平台
  apiPlatformDomain: `${domain}/platform`,
// 组织列表
// 线路
  apiLineDomain: `${domain}/resource`,
// 资源
  apiResourceDomain: `${domain}/resource`,
// 权限
  apiPermissionDomain: `${domain}/permission`,
// 运力
  apiTransportDomain: `${domain}/transport`,
// 订单
  apiLogisticsDomain: `${domain}/logistics`,
// 货源
  apiFreightDomain: `${domain}/freight`,
// 消息
  apiMessageDomain: `${domain}/message`,
//
  gatewayDomain: `${domain}`,
  // settle
  apiSettleDomain: `${domain}/settle`,

  apiAccountDomain: `${domain}/account`,
// 通用地址
//   url: 'http://member.rltx.xyz:3458',
// 运单
  apiWayBillDomain: `${domain}/waybill`,
  apiRegisterDomain: `${domain}/account`,
  apiCompanyDomain: `${domain}/org`,
// 维保
  apiMaintenaceDomain: `${domain}/maintenance`,
// 报表
  apiReportDomain: `${domain}/report`,
  menu: `${domain}/permission`,
// 基础地址
  BaseDomain: `${domain}`
};
