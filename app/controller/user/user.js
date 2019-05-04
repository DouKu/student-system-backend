'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
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
        user,
        token,
      };
    } else {
      ctx.body = 'user not found';
    }
  }
}

module.exports = UserController;
