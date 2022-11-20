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
      type: DataTypes.INTEGER,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    min_weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max_weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    min_height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max_height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdInDataBase: {
    type: DataTypes.BOOLEAN, //esto es para saber si el perro fue creado en la base de datos o no
    allowNull: false,
    defaultValue: true,
    },
  });
};
