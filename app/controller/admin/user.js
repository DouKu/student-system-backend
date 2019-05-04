'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 创建单个用户
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      name: {
        require: true,
        type: 'string',
      },
    }, body);

    const user = await ctx.model.User.create(body);
    ctx.body = user;
  }
  // 更新用户信息
  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      id: {
        request: true,
        type: 'string',
      },
    });

    const user = await ctx.model.User.findById(body.id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    await user.update(body);
    ctx.body = user;
  }
}

module.exports = UserController;
