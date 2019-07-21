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
      // 管理员登录
      router.post('/signin', controller.admin.admin.signin);
      // 认证路由
      router.group({
        name: 'auth::',
        prefix: '/auth',
        middlewares: [ jwt, admin ],
      }, router => {
        // 管理员更改密码
        router.post('/password/reset', controller.admin.admin.reset_password);
        // 获取学生列表
        router.get('/users', controller.admin.user.index);
        // 更新单个学生信息
        router.put('/user', controller.admin.user.update);
        // 添加单个学生
        router.post('/user', controller.admin.user.create);
        // 删除单个学生
        router.delete('/user', controller.admin.user.remove);
        // 批量导入excel更新用户信息
        router.post('/user/import', controller.admin.user.import);
        router.get('/user/export', controller.admin.user.export);
        router.post('/switch/choose', controller.admin.admin.switchChoose);
      });
    });

    // 用户路由
    router.group({
      name: 'user::',
      prefix: '/user',
    }, router => {
      // 学生登录
      router.post('/signin', controller.user.user.signin);
      // 认证路由
      router.group({
        name: 'auth::',
        prefix: '/auth',
        middlewares: [ jwt ],
      }, router => {
        // 学生更新个人信息
        router.put('/user', controller.user.user.update);
        // 学生获取个人信息
        router.get('/user', controller.user.user.get);
      });
    });

  });

};
