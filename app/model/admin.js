'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Admin = app.model.define('Admin', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    role: INTEGER,
    name: STRING(30),
    password: STRING,
    created_at: DATE,
    updated_at: DATE,
  });

  return Admin;
};
