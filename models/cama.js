'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cama extends Model {
    static associate(models) {
      Cama.belongsTo(models.Habitacion, { foreignKey: 'HabitacionId' }); // ✅ esta línea es clave
    }
  }

  Cama.init({
    numero: DataTypes.STRING,
    estado: DataTypes.STRING,
    sexoOcupante: DataTypes.STRING,
    HabitacionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cama',
  });

  return Cama;
};
