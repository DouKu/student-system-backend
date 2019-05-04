'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 学生登录
  async signin() {
    const { ctx, service, app } = this;
    const { Sequelize } = app;
    const { Op } = Sequelize;
    const body = ctx.request.body;
    ctx.validate({
      id_card: {
        type: 'string',
      },
      sutdent_id: {
        type: 'int',
      },
      password: {
        required: true,
        min: 8,
        type: 'password',
      },
    }, body);

    const user = await ctx.model.User.findOne({
      where: {
        [Op.or]: [
          { id_card: body.id_card },
          { authorId: body.sutdent_id },
        ],
        password: body.password,
      },
    });

    if (user) {
      const token = service.auth.createToken({ id: user.id });
      ctx.body = {
        id: user.id,
        token,
      };
    } else {
      ctx.body = 'user not found';
    }
  }
  // 学生修改个人信息
  async update() {
    const { ctx } = this;
    const { userId } = ctx;
    const body = ctx.request.body;
    ctx.validate({
      name: {
        require: true,
        type: 'string',
      },
    }, body);
    const user = await ctx.model.User.findById(userId);
    if (!user) {
      ctx.status = 403;
      return;
    }
    await user.update(body);
    ctx.body = user;
  }
  // 学生获取个人信息
  async get() {
    const { ctx } = this;
    const { query } = ctx;
    const user = await ctx.model.User.findById(query.id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    ctx.body = user;
  }
}

module.exports = UserController;
