'use strict';

const Controller = require('egg').Controller;
const sha256 = require('sha256');

class UserController extends Controller {
  // 学生登录
  async signin() {
    const { ctx, service, app } = this;
    const { Sequelize } = app;
    const { Op } = Sequelize;
    const body = ctx.request.body;
    ctx.validate({
      account: {
        required: true,
        type: 'string',
      },
      password: {
        required: true,
        type: 'string',
      },
    }, body);
    const user = await ctx.model.User.findOne({
      where: {
        [Op.or]: [
          { id_card: body.account },
          { student_id: body.account },
        ],
        password: sha256(body.password.toUpperCase()),
      },
    });
    if (!user) {
      ctx.status = 404;
      return;
    }
    const token = service.auth.createToken({ id: user.id });
    ctx.body = {
      id: user.id,
      token,
    };
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
      sex: {
        require: true,
        type: 'string',
      },
      tel_num: {
        require: true,
        type: 'string',
      },
      address: {
        require: true,
        type: 'string',
      },
      account_location: {
        require: true,
        type: 'string',
      },
      is_dorm: {
        require: true,
        type: 'string',
      },
      guardian_name: {
        require: true,
        type: 'string',
      },
      guardian_tel_num: {
        require: true,
        type: 'string',
      },
      guardian_id_card: {
        require: true,
        type: 'string',
      },
      first_subject: {
        require: true,
        type: 'string',
      },
      second_subject: {
        require: true,
        type: 'array',
      },
    }, body);

    const data = Object.assign({}, body);
    data.second_subject = data.second_subject.join(',');
    if (data.password) {
      delete data.password;
    }
    const user = await ctx.model.User.findById(userId);
    if (!user) {
      ctx.status = 403;
      return;
    }
    await user.update(data);
    ctx.body = user;
  }
  // 学生获取个人信息
  async get() {
    const { ctx } = this;
    const { userId } = ctx;
    console.log(userId, 'ddddddddddddddddddddd');
    const user = await ctx.model.User.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: [
          'id',
          'password',
          'created_at',
          'updated_at',
        ],
      },
    });
    const admin = await ctx.model.Admin.findAll();
    if (!user) {
      ctx.status = 404;
      return;
    }
    const data = Object.assign({}, {
      choose: admin[0].choose,
    }, user.toJSON());
    ctx.body = data;
  }
}

module.exports = UserController;
