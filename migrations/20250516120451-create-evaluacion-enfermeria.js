'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EvaluacionEnfermeria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PacienteId: {
        type: Sequelize.INTEGER
      },
      internacionId: {
        type: Sequelize.INTEGER
      },
      enfermedadesPrevias: {
        type: Sequelize.TEXT
      },
      cirugias: {
        type: Sequelize.TEXT
      },
      alergias: {
        type: Sequelize.TEXT
      },
      medicacionActual: {
        type: Sequelize.TEXT
      },
      antecedentesFamiliares: {
        type: Sequelize.TEXT
      },
      motivoInternacion: {
        type: Sequelize.TEXT
      },
      sintomas: {
        type: Sequelize.TEXT
      },
      presion: {
        type: Sequelize.TEXT
      },
      frecuenciaCardiaca: {
        type: Sequelize.STRING
      },
      frecuenciaRespiratoria: {
        type: Sequelize.STRING
      },
      temperatura: {
        type: Sequelize.STRING
      },
      planCuidados: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EvaluacionEnfermeria');
  }
};