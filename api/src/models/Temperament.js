const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      defaultValue: 'There is no name'
    }
  });
}; 