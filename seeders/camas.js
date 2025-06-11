'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Camas', [
      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 1, createdAt: new Date(), updatedAt: new Date() },
      { numero: '2', estado: 'libre', higienizada: true, HabitacionId: 1, createdAt: new Date(), updatedAt: new Date() },

      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 2, createdAt: new Date(), updatedAt: new Date() },
      { numero: '2', estado: 'libre', higienizada: true, HabitacionId: 2, createdAt: new Date(), updatedAt: new Date() },

      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 3, createdAt: new Date(), updatedAt: new Date() },
      { numero: '2', estado: 'libre', higienizada: true, HabitacionId: 3, createdAt: new Date(), updatedAt: new Date() },

      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 4, createdAt: new Date(), updatedAt: new Date() },

      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 5, createdAt: new Date(), updatedAt: new Date() },
      { numero: '2', estado: 'libre', higienizada: true, HabitacionId: 5, createdAt: new Date(), updatedAt: new Date() },

      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 6, createdAt: new Date(), updatedAt: new Date() },
      { numero: '2', estado: 'libre', higienizada: true, HabitacionId: 6, createdAt: new Date(), updatedAt: new Date() },

      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 7, createdAt: new Date(), updatedAt: new Date() },
      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 8, createdAt: new Date(), updatedAt: new Date() },

      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 9, createdAt: new Date(), updatedAt: new Date() },
      { numero: '1', estado: 'libre', higienizada: true, HabitacionId: 10, createdAt: new Date(), updatedAt: new Date() }

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Camas', null, {});
  }
};
