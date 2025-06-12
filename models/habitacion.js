'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Habitacion extends Model {
    static associate(models) {
      Habitacion.belongsTo(models.Ala, { foreignKey: 'AlaId' });
      Habitacion.hasMany(models.Cama, { foreignKey: 'HabitacionId' });
    }
  }

  Habitacion.init({
    numero: DataTypes.STRING,
    cantidadCamas: DataTypes.INTEGER,
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'consulta'
    },
    requiereInternacion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    AlaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Habitacion',
  });

  return Habitacion;
};
