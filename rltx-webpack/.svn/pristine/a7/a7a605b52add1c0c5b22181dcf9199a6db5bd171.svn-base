/**
 * Created by zhuyi on 16/10/27.
 */
const conf = {
  production: {
    mysqlDB: {
      host: 'rdsp7uxn6o0hlp14gtne1.mysql.rds.aliyuncs.com',
      user: 'appuser',
      password: 'rl_tx-app_tx_rl',
      database: 'wldev',
      port: '3306'
    },
    oss: {
      region: 'oss-cn-hangzhou',
      accessKeyId: 'uRarwidDKKrnzk3U',
      accessKeySecret: 'Wrj6dPsg6AWi739otNjDGFg3Ojcqj8',
      bucket: 'dev-static'
    }
  },
  dev: {
    mysqlDB: {
      host: '192.168.1.81',
      user: 'wltest',
      password: 'wltest123',
      database: 'wldev',
      port: '33061'
    },
    oss: {
      region: 'oss-cn-hangzhou',
      accessKeyId: 'uRarwidDKKrnzk3U',
      accessKeySecret: 'Wrj6dPsg6AWi739otNjDGFg3Ojcqj8',
      bucket: 'dev-static'
    }
  },
  test: {
    mysqlDB: {
      host: '192.168.1.52',
      user: 'wltest',
      password: 'wltest123',
      database: 'wldev',
      port: '33061'
    },
    oss: {
      region: 'oss-cn-hangzhou',
      accessKeyId: 'uRarwidDKKrnzk3U',
      accessKeySecret: 'Wrj6dPsg6AWi739otNjDGFg3Ojcqj8',
      bucket: 'dev-static'
    }
  },
  localhost: {
    mysqlDB: {
      host: '192.168.1.81',
      user: 'wltest',
      password: 'wltest123',
      database: 'wldev_0301',
      port: '33061'
    },
    oss: {
      region: 'oss-cn-hangzhou',
      accessKeyId: 'uRarwidDKKrnzk3U',
      accessKeySecret: 'Wrj6dPsg6AWi739otNjDGFg3Ojcqj8',
      bucket: 'dev-static'
    }
  },
  staging: {
    mysqlDB: {
      host: 'rm-bp10felx35o18015z.mysql.rds.aliyuncs.com',
      user: 'yfbdbuser',
      password: 'XgUVLJ0JPW9uzydiuaIp',
      database: 'wldev',
      port: '3306'
    },
    oss: {
      region: 'oss-cn-hangzhou',
      accessKeyId: 'uRarwidDKKrnzk3U',
      accessKeySecret: 'Wrj6dPsg6AWi739otNjDGFg3Ojcqj8',
      bucket: 'dev-static'
    }
  }
};

module.exports.get = function get(env) {
  return conf[env] || conf.localhost;
};
