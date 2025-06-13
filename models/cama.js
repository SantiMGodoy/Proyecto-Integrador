'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cama extends Model {
    static associate(models) {
      Cama.belongsTo(models.Habitacion, { foreignKey: 'HabitacionId' });
      Cama.belongsTo(models.Paciente, { foreignKey: 'PacienteId' });
    }
  }

  Cama.init({
    numero: DataTypes.STRING,
    estado: DataTypes.STRING,
    sexoOcupante: DataTypes.STRING,
    higienizada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    HabitacionId: DataTypes.INTEGER,
    PacienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cama',
  });

  return Cama;
};