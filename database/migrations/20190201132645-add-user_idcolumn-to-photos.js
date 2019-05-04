'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER } = Sequelize;
    await queryInterface.addColumn('photos', 'user_id', {
      type: INTEGER,
      allowNull: false,
    });
  },
  down: async queryInterface => {
    await queryInterface.removeColumn('photos', 'user_id');
  },
};
