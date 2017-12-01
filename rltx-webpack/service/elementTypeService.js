/**
 * Created by zhuyi on 17/4/19.
 */
const configElementTypeDao = require('../dao/mysql/configElementTypeDao');
const configElementTypeInfoDao = require('../dao/mysql/configElementTypeInfoDao');

/**
 * 获取element type deine
 *
 * 格式为
 *      {
 *        element_code: {
 *          element_info_codes:[], element_info_code数组
 *          event:, 事件
 *        },
 *      }
 * @param orgId 组织id
 * @param cb 回调方法
 */
module.exports.getElementTypeDefine = function (orgId, cb) {
  configElementTypeDao.getElementTypeRelation(orgId, (err, rows) => {
    if (err) {
      cb(err);
    } else {
      /* 结构
      {
        element_code: {
          element_info_codes:[], element_info_code数组
          event:, 事件
        },
      }
      */
      const resultMap = {};
      for (let index = 0; index < rows.length; index++) {
        // 获取element code
        const elementCode = rows[index].elementCode;
        // 获取element info code
        const elementInfoCode = rows[index].elementInfoCode;
        // 获取event
        const event = rows[index].event;

        let elementCodeResult = resultMap[elementCode];

        if (elementCodeResult) {
          elementCodeResult.element_info_codes.push(elementInfoCode);
        } else {
          elementCodeResult = {
            element_info_codes: [elementInfoCode],
            event
          }
          resultMap[elementCode] = elementCodeResult;
        }
      }
      cb(null, resultMap);
    }
  });
};

/**
 * 获取element type info
 *
 * 格式为
 *      {
 *        element_info_code: {
 *          control_type:, 表现形式
 *          datasource:, 数据源
 *          event:, 事件
 *          model_id:, 模版
 *        }
 *      }
 *
 * @param orgId 组织id
 * @param cb 回调方法
 */
module.exports.getElementTypeInfo = function (orgId, cb) {
  configElementTypeInfoDao.getElementTypeInfo(orgId, function (err, rows) {
    if (err) {
      cb(err);
    } else {
      /* 结构
       *      {
       *        element_info_code: {
       *          control_type:, 表现形式
       *          datasource:, 数据源
       *          event:, 事件
       *          model_id:, 模版
       *        }
       *      }
       */
      var resultMap = {};
      for (var index in rows) {
        // 获取 element info code
        var elementInfoCode = rows[index]['elementInfoCode'];
        // 获取 表现形式
        var controlType = rows[index]['controlType'];
        // 获取 数据源
        var datasource = rows[index]['datasource'];
        // 获取 事件
        var event = rows[index]['event'];
        // 获取 模版
        var modelId = rows[index]['modelId'];

        var result = {
          control_type: controlType,
          datasource: datasource,
          event: event,
          model_id: modelId
        };
        resultMap[elementInfoCode] = result;
      }
      cb(null, resultMap);
    }
  });
}
