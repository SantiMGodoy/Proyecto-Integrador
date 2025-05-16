'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Habitacion extends Model {
    static associate(models) {
      // Relaciones aquí dentro
      Habitacion.belongsTo(models.Ala, { foreignKey: 'AlaId' });
      Habitacion.hasMany(models.Cama, { foreignKey: 'HabitacionId' });
    }
  }

  Habitacion.init({
    numero: DataTypes.STRING,
    cantidadCamas: DataTypes.INTEGER,
    AlaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Habitacion',
  });

  return Habitacion;
};
