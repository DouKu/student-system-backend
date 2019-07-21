'use strict';

const Controller = require('egg').Controller;
const sha256 = require('sha256');

class AdminController extends Controller {
  async signin() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    ctx.validate({
      account: {
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
        name: body.account,
        password: sha256(body.password),
      },
    });
    if (admin) {
      const token = service.auth.createToken({ id: admin.id });
      ctx.body = {
        id: admin.id,
        token,
      };
    } else {
      ctx.status = 404;
    }
  }
  async reset_password() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      account: {
        required: true,
        type: 'string',
      },
      password: {
        required: true,
        min: 8,
        type: 'string',
      },
      new_password: {
        required: true,
        min: 8,
        type: 'string',
      },
    }, body);
    const admin = await ctx.model.Admin.findOne({
      where: {
        name: body.account,
        password: sha256(body.password),
      },
    });
    if (admin) {
      admin.update({
        password: sha256(body.new_password),
      });
      ctx.body = 'reset success';
    } else {
      ctx.status = 404;
    }
  }
  async switchChoose() {
    const { ctx } = this;
    const id = ctx.userId;
    const admin = await ctx.model.Admin.findById(id);
    const choose = admin.choose === 1 ? 0 : 1;
    admin.update({
      choose,
    });
    ctx.body = 'switch success';
  }
}

module.exports = AdminController;
