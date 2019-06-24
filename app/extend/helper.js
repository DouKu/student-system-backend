'use strict';

exports.getAccessToken = ctx => {
  if (ctx.query.token) {
    return ctx.query.token;
  }
  const bearerToken = ctx.request.header.authorization;
  return bearerToken && bearerToken.replace('Bearer ', '');
};
