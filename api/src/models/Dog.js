const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dogs', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    life_span: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    min_weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min_height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdInDataBase: {
    type: DataTypes.BOOLEAN, 
    allowNull: false,
    defaultValue: true,
    },
  });
}; 

