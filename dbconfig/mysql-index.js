const mysqlDbConfig = require('./mysql-db.config.js');
const {Sequelize} = require('sequelize');

module.exports = db = {};

async function initialize() {
    const sequelize = new Sequelize(
        mysqlDbConfig.DB, 
        mysqlDbConfig.USER,
        mysqlDbConfig.PASSWORD, {
            host: mysqlDbConfig.HOST,
            dialect: mysqlDbConfig.dialect,
            operationsAliases: false,
        }
        );
        db.User = require('./models/mysql/test.model')(sequelize, Sequelize);
        db.Airline = require('./models/mysql/airline.model')(sequelize, Sequelize);
        db.Plane = require('./models/mysql/plane.model')(sequelize, Sequelize);
        db.Airport = require('./models/mysql/airport.model')(sequelize, Sequelize);
        db.Flight = require('./models/mysql/flight.model')(sequelize, Sequelize);
        db.FlightDetails = require('./models/mysql/flight-details.model')(sequelize, Sequelize);
        db.Ticket = require('./models/mysql/ticket.model')(sequelize, Sequelize);

        db.Airline.hasOne(db.Plane, {
            foreignKey: {
                name: 'airline_id', 
                allowNull: false 
            }, onDelete: 'CASCADE' 
        })

        db.Plane.belongsTo(db.Airline, {
            foreignKey: {
                name: 'airline_id', 
                allowNull: false 
            }, onDelete: 'CASCADE' 
        })

        db.Plane.hasOne(db.Flight, {
            foreignKey:   {
                name: 'plane_id',    
                allowNull: false 
            }, onDelete: 'CASCADE'        
        })

        db.Flight.belongsTo(db.Plane, {
            foreignKey:   {
                name: 'plane_id',    
                allowNull: false 
            }, onDelete: 'CASCADE'        
        })

        db.Airport.hasOne(db.Flight, {
            foreignKey: {  
                name: 'starting_airport_id',          
                allowNull: false 
        },             
            onDelete: 'CASCADE'        
        })

        db.Airport.hasOne(db.Flight, {
            foreignKey: {  
                name: 'destination_airport_id',                    
                allowNull: false 
        },             
            onDelete: 'CASCADE'        
        })
        
        db.Flight.belongsTo(db.Airport, {
            foreignKey: {  
                name: 'starting_airport_id', 
                as: 'starting_airport_id',
                allowNull: false 
        },                 as: 'starting_airport',

            onDelete: 'CASCADE'        
        })
 
        db.Flight.belongsTo(db.Airport, {
            foreignKey: {  
                name: 'destination_airport_id', 
                as: 'destination_airport_id',
                allowNull: false 
        },                 as: 'destination_airport',

            onDelete: 'CASCADE'        
        })

        db.Flight.hasMany(db.FlightDetails, {
            foreignKey: {  
                name: 'fk_flight_id',    
                allowNull: false 
            }, 
            targetKey: 'flight_id',
            onDelete: 'CASCADE'        
        })

        db.FlightDetails.belongsTo(db.Flight, {
            foreignKey: {  
                name: 'fk_flight_id',    
                allowNull: false 
            }, 
            sourceKey: 'flight_id',
            onDelete: 'CASCADE'        
        })

        db.Ticket.hasOne(db.Flight, {
            foreignKey: {  
                name: 'flight_id',    
                allowNull: false 
        }, onDelete: 'CASCADE'        
        })

        db.Ticket.belongsTo(db.Flight, {
            foreignKey: {  
                name: 'flight_id',    
                allowNull: false 
        }, onDelete: 'CASCADE'        
        })
        
        await sequelize.sync({ alter: true });
}

initialize();