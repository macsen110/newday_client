/**
 * Created by zhuyi on 17/4/18.
 */
var orgPartnerFieldConfigDao = require('../dao/mysql/orgPartnerFieldConfigDao');

/**
 * 获取伙伴字段配置
 *
 * 格式为 [
 *        {
 *          field_config_code, 字段唯一性code，控件的name
 *          element_code:, 元素类型
 *          format:, format
 *          extra_params:, 额外参数 json格式
 *          search_element_code, 检索元素类型
 *          search_extra_params:, 检索额外参数， json格式
 *          show_name:, 显示字段
 *          type:, 1.平台定义 2.企业自定义
 *        }
 *       ]
 *
 *
 * @param orgId 组织id
 * @param cb 回调方法
 */
module.exports.getPartnerFieldConfig = function (orgId, cb) {
  orgPartnerFieldConfigDao.getPartnerFieldConfig(orgId, (err, rows) => {
    if (err) {
      cb(err);
    } else {
      const results = [];
      for (let index = 0; index < rows.length; index++) {
        var result = {
          field_config_code: rows[index].fieldConfigCode,
          type: rows[index].type,
          show_name: rows[index].showName,
          format: rows[index].format,
          element_code: rows[index].elementCode,
          extra_params: rows[index].extraParams,
          search_element_code: rows[index].searchElementCode,
          search_extra_params: rows[index].searchExtraParams
        }
        results.push(result);
      }
      cb(null, results);
    }
  });
}

