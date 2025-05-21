'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Internacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Internacion.belongsTo(models.Cama, { foreignKey: 'CamaId' });
      Internacion.belongsTo(models.Paciente, { foreignKey: 'PacienteId' });
    }
  }
  Internacion.init({
    PacienteId: DataTypes.INTEGER,
    CamaId: DataTypes.INTEGER,
    fechaIngreso: DataTypes.DATE,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Internacion',
  });
  return Internacion;
};