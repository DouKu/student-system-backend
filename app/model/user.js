'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('User', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30), // 姓名
    student_id: STRING, // 学号
    sex: STRING, // 性别
    id_card: STRING, // 身份证
    password: STRING, // 密码
    account_location: STRING, // 户口所在地
    tel_num: STRING, // 电话号码
    is_dorm: STRING, // 是否内宿
    is_create_file: STRING,
    is_subsistence: STRING,
    is_disability: STRING,
    address: STRING, // 家庭住址
    graduated_school: STRING, // 毕业学校
    guardian_name: STRING(30), // 监护人姓名
    guardian_tel_num: STRING, // 监护人电话号码
    guardian_id_card: STRING, // 监护人身份证
    first_subject: STRING, // 科目信息一
    second_subject: STRING, // 科目信息二
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
