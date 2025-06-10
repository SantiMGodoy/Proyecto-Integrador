'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Camas', [
      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 1, createdAt: new Date(), updatedAt: new Date() },
      { numero: '2', estado: 'libre', higienizada: true, HabitacionId: 1, createdAt: new Date(), updatedAt: new Date() },
      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 2, createdAt: new Date(), updatedAt: new Date() },
      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 3, createdAt: new Date(), updatedAt: new Date() },
      { numero: '2', estado: 'libre', higienizada: true, HabitacionId: 3, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Camas', null, {});
  }
};
