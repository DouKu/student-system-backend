'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async signin() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    ctx.validate({
      email: {
        required: true,
        type: 'email',
      },
      password: {
        required: true,
        min: 8,
        type: 'password',
      },
    }, body);

    const user = await ctx.model.User.findOne({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (user) {
      const token = service.user.createToken({ id: user.id });
      ctx.body = {
        user,
        token,
        status: 'ok',
        currentAuthority: 'user',
      };
    } else {
      ctx.body = 'user not found';
    }
  }
}

module.exports = AdminController;
