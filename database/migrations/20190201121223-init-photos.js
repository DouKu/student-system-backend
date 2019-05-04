'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('photos', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // 关联相册
      album_id: {
        type: INTEGER,
        allowNull: false,
      },
      // 相片名称
      name: {
        type: STRING(30),
        defaultValue: '',
      },
      // 相片描述
      desc: {
        type: STRING(100),
        defaultValue: '',
      },
      // 相片地址
      url: {
        type: STRING(512),
        allowNull: false,
        defaultValue: '',
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('photos');
  },
};
