'use strict';

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt();
  const admin = app.middleware.admin();

  router.get('/', controller.home.index);

  router.group({ name: 'index::', prefix: '/api' }, router => {


    // 管理员路由
    router.group({
      name: 'admin::',
      prefix: '/admin',
    }, router => {
      router.post('/signin', controller.admin.signin);
      // 认证路由
      router.group({
        name: 'auth::',
        prefix: '/auth',
        middlewares: [ jwt, admin ],
      }, router => {
        // 获取用户列表
        // 更新单个用户信息
        // 批量导入excel更新用户信息
      });
    });

    // 用户路由
    router.group({
      name: 'user::',
      prefix: '/user',
    }, router => {
      router.post('/signin', controller.user.signin);
      // 认证路由
      router.group({
        name: 'auth::',
        prefix: '/auth',
        middlewares: [ jwt ],
      }, router => {
      });
    });

  });

};
