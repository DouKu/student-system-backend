'use strict';

// had enabled by egg
// exports.static = true;

// mysql orm
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

// args validate
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

// jwt
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

// cors
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

// egg router group
exports.routerGroup = {
  enable: true,
  package: 'egg-router-group',
};

exports.security = {
  csrf: false,
};

exports.cos = {
  enable: true,
  package: 'egg-cos',
};
