'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Alas', [
      { nombre: 'Ala Norte', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ala Sur', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ala Este', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ala Oeste', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ala Central', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Alas', null, {});
  }
};
