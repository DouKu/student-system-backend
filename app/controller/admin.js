'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async signin() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    ctx.validate({
      name: {
        required: true,
        type: 'string',
      },
      password: {
        required: true,
        min: 8,
        type: 'password',
      },
    }, body);

    const admin = await ctx.model.Admin.findOne({
      where: {
        email: body.name,
        password: body.password,
      },
    });
    if (admin) {
      const token = service.user.createToken({ id: admin.id });
      ctx.body = {
        admin,
        token,
        status: 'ok',
        currentAuthority: 'admin',
      };
    } else {
      ctx.body = 'admin not found';
    }
  }
}

module.exports = AdminController;
