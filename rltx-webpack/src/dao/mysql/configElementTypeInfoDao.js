/**
 * Created by zhuyi on 17/4/19.
 */
const db = require('../dbManager');

module.exports.getElementTypeInfo = (orgId, cb) => {
  db.execute((err, conn) => {
    const sql = 'select element_info_code as elementInfoCode, ' +
                     'control_type as controlType, ' +
                     'datasource as datasource, ' +
                     'event as event, ' +
                     'model_id as modelId ' +
              'from config_element_type_info ' +
              'where deleted = 0 ' +
              'and disabled = 0 ' +
              'and owner_org_id = ?';
    conn.query(sql, [orgId], (err1, rows) => {
      cb(err1, rows);
    });
  });
};
