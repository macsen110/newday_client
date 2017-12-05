const mysql = require('mysql');
const config = require('../config/Config').get(process.env.NODE_ENV);

const pool = mysql.createPool({
  host: config.mysqlDB.host,
  user: config.mysqlDB.user,
  password: config.mysqlDB.password,
  database: config.mysqlDB.database,
  port: config.mysqlDB.port
});

/**
 * 封装通用方法, 每次完成后释放连接
 *
 * @param callback
 */
exports.execute = (cb) => {
  pool.getConnection((err, conn) => {
    if (err) {
      cb(err);
    } else {
      cb(err, conn);
    }
    if (conn) {
      conn.release();
    }
  });
};

