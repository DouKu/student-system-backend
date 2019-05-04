'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER } = Sequelize;
    await queryInterface.addColumn('albums', 'public', {
      type: INTEGER(100),
      defaultValue: 1,
    });
  },
  down: async queryInterface => {
    await queryInterface.removeColumn('albums', 'public');
  },
};
