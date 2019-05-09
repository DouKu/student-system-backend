'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('User', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30), // 姓名
    sutdent_id: INTEGER, // 学号
    sex: INTEGER, // 性别
    email: STRING, // 邮箱
    id_card: STRING, // 身份证
    password: STRING, // 密码
    account_location: STRING, // 户口所在地
    tel_num: STRING, // 电话号码
    is_dorm: INTEGER, // 是否内宿
    address: STRING, // 家庭住址
    graduated_school: STRING, // 毕业学校
    guardian_name: STRING(30), // 监护人姓名
    guardian_tel_num: STRING, // 监护人电话号码
    guardian_id_card: STRING, // 监护人身份证
    created_at: DATE,
  });

  return User;
};
