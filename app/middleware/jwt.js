'use strict';

module.exports = () => {
  return async function jwt(ctx, next) {
    const token = ctx.helper.getAccessToken(ctx);
    const verifyResult = await ctx.service.auth.verifyToken(token);
    if (!verifyResult.verify) {
      ctx.status = 401;
      return;
    }
    ctx.userId = verifyResult.message.id;
    await next();
  };
};
