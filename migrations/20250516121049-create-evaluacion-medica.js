'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EvaluacionMedicas', {
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
      diagnostico: {
        type: Sequelize.TEXT
      },
      tratamientos: {
        type: Sequelize.TEXT
      },
      medicacion: {
        type: Sequelize.TEXT
      },
      estudiosSolicitados: {
        type: Sequelize.TEXT
      },
      observaciones: {
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
    await queryInterface.dropTable('EvaluacionMedicas');
  }
};