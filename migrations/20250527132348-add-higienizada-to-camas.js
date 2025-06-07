'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Camas', 'higienizada', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Camas', 'higienizada');
  }
};
