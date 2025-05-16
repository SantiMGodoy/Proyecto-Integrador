'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EvaluacionEnfermeria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

EvaluacionEnfermeria.belongsTo(models.Paciente, { foreignKey: 'PacienteId' });
EvaluacionEnfermeria.belongsTo(models.Internacion, { foreignKey: 'internacionId' });

    }
  }
  EvaluacionEnfermeria.init({
    PacienteId: DataTypes.INTEGER,
    internacionId: DataTypes.INTEGER,
    enfermedadesPrevias: DataTypes.TEXT,
    cirugias: DataTypes.TEXT,
    alergias: DataTypes.TEXT,
    medicacionActual: DataTypes.TEXT,
    antecedentesFamiliares: DataTypes.TEXT,
    motivoInternacion: DataTypes.TEXT,
    sintomas: DataTypes.TEXT,
    presion: DataTypes.TEXT,
    frecuenciaCardiaca: DataTypes.STRING,
    frecuenciaRespiratoria: DataTypes.STRING,
    temperatura: DataTypes.STRING,
    planCuidados: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'EvaluacionEnfermeria',
  });
  return EvaluacionEnfermeria;
};