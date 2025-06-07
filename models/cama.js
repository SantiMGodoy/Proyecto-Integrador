'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cama extends Model {
    static associate(models) {
      Cama.belongsTo(models.Habitacion, { foreignKey: 'HabitacionId' });
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
    HabitacionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cama',
  });

  return Cama;
};
