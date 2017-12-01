/**
 * Created by zhuyi on 17/4/19.
 */
const db = require('../dbManager');

module.exports.getElementTypeRelation = (orgId, cb) => {
  db.execute((err, conn) => {
    const sql = 'select a.element_code as elementCode, ' +
                     'b.element_info_code as elementInfoCode, ' +
                     'a.event as event ' +
              'from config_element_type a ' +
              'left join config_element_type_info_relation b ' +
              'on a.element_code = b.element_code ' +
              'and b.deleted = 0 ' +
              'and b.disabled = 0 ' +
              'where a.deleted = 0 ' +
              'and a.disabled = 0 ' +
              'and a.owner_org_id = ?';
    conn.query(sql, [orgId], (err1, rows) => {
      cb(err1, rows);
    });
  });
};
