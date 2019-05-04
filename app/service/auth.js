'use strict';

const Service = require('egg').Service;

class AuthService extends Service {

  createToken(data) {
    const { app } = this;
    return app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: '12h',
    });
  }

  verifyToken(token) {
    const { app } = this;
    return new Promise(resolve => {
      app.jwt.verify(token, app.config.jwt.secret, function(err, decoded) {
        const result = {};
        if (err) {
          result.verify = false;
          result.message = err.message;
        } else {
          result.verify = true;
          result.message = decoded;
        }
        resolve(result);
      });
    });
  }

}

module.exports = AuthService;
