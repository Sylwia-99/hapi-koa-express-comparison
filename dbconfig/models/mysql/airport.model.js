const flight = require("./flight.model");

module.exports = (sequelize, Sequelize) => {
    const Airport = sequelize.define("Airport", {
        airport_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,        
            allowNull: false,
            unique: true,
        },
        flight_name: {
            type: Sequelize.STRING,          
            allowNull: false
        },
    },
    {
        tableName: 'airport',
        timestamps: false
    });  
    Airport.removeAttribute('createdAt');
    Airport.removeAttribute('updatedAt');
    return Airport;
  };