const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dogs",
    {
      id: {
        type: DataTypes.UUID, //identificador unico universal
        defaultValue: DataTypes.UUIDV4,//MySQL no tiene un tipo UUID navito por lo tanto lo convierte, sequelize proporciona UUIDV1 Y UUIDV4 como valor predeterminado para las columnas de tipo UUID.
        primaryKey: true, //identifica de forma unica cada registro de una tabla,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //no permite valores nulos.
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: true, createdAt: "creado", updatedAt: false }
  ); //marca de tiempo: true = MONGOOSE agrega dos propiedades de tipo fecha a su esquema: createAt: fecha que representa el momento en el que se creo el documento, updateAt(actualizado en) fecha ultima actualizacion.
}; //MOONGOSE: Biblioteca de javascript que permite definir esquemas con datos fuertemente tipados.// Es una libreria para Node.js que nos permite escribir consultas para una base de datos de mongoDB, con validaciones, queries, middlewares, conversion de tipo, etc.
