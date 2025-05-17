'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EvaluacionMedica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EvaluacionMedica.belongsTo(models.Paciente, { foreignKey: 'PacienteId' });
      EvaluacionMedica.belongsTo(models.Internacion, { foreignKey: 'internacionId' });
    }
  }
  EvaluacionMedica.init({
    PacienteId: DataTypes.INTEGER,
    internacionId: DataTypes.INTEGER,
    diagnostico: DataTypes.TEXT,
    tratamientos: DataTypes.TEXT,
    medicacion: DataTypes.TEXT,
    estudiosSolicitados: DataTypes.TEXT,
    observaciones: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'EvaluacionMedica',
  });
  return EvaluacionMedica;
};