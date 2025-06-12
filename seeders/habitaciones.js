'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Habitacions', [
      { numero: '101', cantidadCamas: 2, tipo: 'consulta', requiereInternacion: false, AlaId: 1, createdAt: new Date(), updatedAt: new Date() },
      { numero: '102', cantidadCamas: 2, tipo: 'consulta', requiereInternacion: false, AlaId: 1, createdAt: new Date(), updatedAt: new Date() },

      { numero: '201', cantidadCamas: 2, tipo: 'pediatria', requiereInternacion: false, AlaId: 2, createdAt: new Date(), updatedAt: new Date() },
      { numero: '202', cantidadCamas: 1, tipo: 'pediatria', requiereInternacion: false, AlaId: 2, createdAt: new Date(), updatedAt: new Date() },

      { numero: '301', cantidadCamas: 2, tipo: 'cirugia', requiereInternacion: true, AlaId: 3, createdAt: new Date(), updatedAt: new Date() },
      { numero: '302', cantidadCamas: 2, tipo: 'cirugia', requiereInternacion: true, AlaId: 3, createdAt: new Date(), updatedAt: new Date() },

      { numero: '401', cantidadCamas: 1, tipo: 'cuidados intensivos', requiereInternacion: true, AlaId: 4, createdAt: new Date(), updatedAt: new Date() },
      { numero: '402', cantidadCamas: 1, tipo: 'cuidados intensivos', requiereInternacion: true, AlaId: 4, createdAt: new Date(), updatedAt: new Date() },

      { numero: '501', cantidadCamas: 1, tipo: 'clinica medica', requiereInternacion: true, AlaId: 5, createdAt: new Date(), updatedAt: new Date() },
      { numero: '502', cantidadCamas: 1, tipo: 'clinica medica', requiereInternacion: true, AlaId: 5, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Habitacions', null, {});
  }
};
