'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('albums', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // 用户id
      user_id: {
        type: INTEGER,
        allowNull: false,
      },
      // 相册名
      name: {
        type: STRING(50),
        allowNull: false,
        defaultValue: '',
      },
      // 相册封面图
      avatar: {
        type: STRING(512),
        allowNull: false,
        defaultValue: '',
      },
      // 建立时间
      created_at: DATE,
      // 更新时间
      updated_at: DATE,
    }, {
      indexes: [
        {
          method: 'BTREE',
          fields: [ 'created_at', 'user_id' ],
        },
      ],
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('albums');
  },
};
