'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Habitacions', [ // Sequelize pluraliza mal: usa 'Habitacions'
      { numero: '101', cantidadCamas: 2, AlaId: 1, createdAt: new Date(), updatedAt: new Date() },
      { numero: '102', cantidadCamas: 1, AlaId: 1, createdAt: new Date(), updatedAt: new Date() },
      { numero: '201', cantidadCamas: 2, AlaId: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Habitacions', null, {});
  }
};
