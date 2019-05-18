'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 添加当个学生
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
  // 更新学生信息
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
  // 获取学生列表
  async index() {
    const { ctx } = this;
    const { query } = ctx;
    const users = await ctx.model.User.findAll({
      where: query,
      attributes: {
        exclude: [
          'password',
          'created_at',
          'updated_at',
        ],
      },
    });
    ctx.body = users;
  }
}

module.exports = UserController;
