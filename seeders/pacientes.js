'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pacientes', [
      {
        nombre: 'Juan Pérez',
        dni: '12345678',
        fechaNacimiento: new Date('1980-05-10'),
        sexo: 'M',
        telefono: '1133445566',
        direccion: 'Calle Falsa 123',
        obraSocial: 'OSDE',
        viaIngreso: 'programada',
        medicoDerivante: null,
        motivoIngreso: 'Control general',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ana López',
        dni: '23456789',
        fechaNacimiento: new Date('1990-07-22'),
        sexo: 'F',
        telefono: '1122334455',
        direccion: 'Av. Siempre Viva 742',
        obraSocial: 'IOMA',
        viaIngreso: 'derivacion',
        medicoDerivante: 'Dr. Carlos Ruiz',
        motivoIngreso: 'Dolor abdominal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Paciente de Prueba',
        dni: '99999999',
        fechaNacimiento: new Date('1970-01-01'),
        sexo: 'X',
        telefono: '0000000000',
        direccion: 'Desconocida',
        obraSocial: 'Sin cobertura',
        viaIngreso: 'programada',
        medicoDerivante: null,
        motivoIngreso: 'Chequeo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pacientes', null, {});
  }
};
