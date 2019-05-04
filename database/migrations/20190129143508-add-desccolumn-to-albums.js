'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;
    await queryInterface.addColumn('albums', 'desc', {
      type: STRING(100),
      defaultValue: '',
    });
  },
  down: async queryInterface => {
    await queryInterface.removeColumn('albums', 'desc');
  },
};
