'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {

    static associate(models) {
      Paciente.hasMany(models.Internacion, { foreignKey: 'PacienteId' });
      Paciente.hasOne(models.Cama, { foreignKey: 'PacienteId' });
    }
  }
  Paciente.init({
    nombre: DataTypes.STRING,
    dni: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE,
    sexo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    obraSocial: DataTypes.STRING,
    viaIngreso: DataTypes.STRING,
    medicoDerivante: DataTypes.STRING,
    motivoIngreso: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Paciente',
  });
  return Paciente;
};