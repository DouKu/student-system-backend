'use strict';

module.exports = () => {
  return async function admin(ctx, next) {
    const id = ctx.userId;
    const admin = await ctx.model.Admin.findOne({
      where: {
        id,
        role: 0,
      },
      attributes: {
        exclude: [
          'password',
        ],
      },
    });
    ctx.admin = admin;
    if (!admin) {
      return 401;
    }
    await next();
  };
};
