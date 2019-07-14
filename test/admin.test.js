'use strict';
const sha256 = require('sha256');

const mock = require('egg-mock');

describe('admin', () => {
  let app;
  before(() => {
    app = mock.app();
    return app.ready();
  });
  it('create admin', () => {
    const ctx = app.mockContext();
    ctx.model.Admin.create({
      role: 0,
      name: 'admin',
      password: sha256('12345678'),
    });
  });
});
