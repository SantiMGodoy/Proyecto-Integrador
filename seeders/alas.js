'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Alas', [
      { nombre: 'Ala Norte', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ala Sur', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Alas', null, {});
  }
};
