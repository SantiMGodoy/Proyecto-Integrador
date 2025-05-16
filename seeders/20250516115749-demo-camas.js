'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Camas', [
      { numero: '1A', estado: 'libre', sexoOcupante: null, HabitacionId: 1, createdAt: new Date(), updatedAt: new Date() },
      { numero: '1B', estado: 'libre', sexoOcupante: null, HabitacionId: 1, createdAt: new Date(), updatedAt: new Date() },
      { numero: '2A', estado: 'libre', sexoOcupante: null, HabitacionId: 2, createdAt: new Date(), updatedAt: new Date() },
      { numero: '3A', estado: 'libre', sexoOcupante: null, HabitacionId: 3, createdAt: new Date(), updatedAt: new Date() },
      { numero: '3B', estado: 'libre', sexoOcupante: null, HabitacionId: 3, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Camas', null, {});
  }
};
