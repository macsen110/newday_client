/**
 * Created by zhuyi on 17/4/13.
 */
const db = require('../dbManager');

module.exports.getPartnerFieldConfig = (orgId, cb) => {
  db.execute((err, conn) => {
    const sql = 'select field_config_code as fieldConfigCode, ' +
                        'type as type, ' +
                        'show_name as showName, ' +
                        'format as format, ' +
                        'element_code as elementCode, ' +
                        'extra_params as extraParams, ' +
                        'search_element_code as searchElementCode, ' +
                        'search_extra_params as searchExtraParams ' +
                 'from org_partner_field_config ' +
                 'where deleted = 0 ' +
                 'and disabled = 0 ' +
                 'and owner_org_id = ?';
    conn.query(sql, [orgId], (err1, rows) => {
      cb(err1, rows);
    });
  });
};
