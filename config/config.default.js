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
    database: 'photolive',
  };

  // jwt
  config.jwt = {
    secret: 'photolive',
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

  return config;
};
