'use strict';

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt();

  router.get('/', controller.home.index);

  router.group({ name: 'index::', prefix: '/api' }, router => {


    // 管理员路由
    router.group({
      name: 'admin::',
      prefix: '/admin',
    }, router => {
    });

    // 用户路由
    router.group({
      name: 'user::',
      prefix: '/user',
    }, router => {
      router.post('/signin', controller.user.signin);
    });

    // 认证路由
    router.group({
      name: 'auth::',
      prefix: '/auth',
      middlewares: [ jwt ],
    }, router => {
    });

  });

};
