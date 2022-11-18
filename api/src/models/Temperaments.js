const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Temperaments', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}