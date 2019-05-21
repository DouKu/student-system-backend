'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';

  // add your config here
  config.middleware = [];

  // mysql config
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password: 'lgy',
    database: 'studentsys',
  };

  // jwt
  config.jwt = {
    secret: 'student-sys',
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.multipart = {
    whitelist: [
      '.png',
      '.jpg',
      '.svg',
      '.gif',
      '.doc',
      '.docx',
    ],
  };

  config.cos = {
    client: {
      secretId: 'AKIDwhFXZMZDIAoFTTqo8D3e2B5kBNL4ly3s',
      secretKey: 'jDSRAdvzoQpzuc5KL9i4B3h6IFySmskN',
      bucket: 'lgybetter-1252293784',
      region: 'ap-guangzhou',
    },
  };

  config.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostname: '127.0.0.1',
    },
  };

  return config;
};
