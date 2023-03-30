const nosqlDbConfig = require('./nosql-db.config.js');
const mongoose =  require("mongoose");
const insertData =  require('./insert-nosql-data.service.js');
module.exports = db = {};

async function initialize() {
    const URI = 'mongodb://' + nosqlDbConfig.HOST + ':' + nosqlDbConfig.PORT + '/' + nosqlDbConfig.DB

    db = mongoose.connect(URI,{
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // skip trying IPv6
        useNewUrlParser: true,
        useUnifiedTopology: true
        });}
    db.User = require('./models/nosql/test.model')(mongoose);
    db.Airline = require('./models/nosql/airline.model')(mongoose);
    db.Airport = require('./models/nosql/airport.model')(mongoose);
    db.Plane = require('./models/nosql/plane.model')(mongoose);
    db.FlightDetails = require('./models/nosql/flight-details.model')(mongoose);
    db.Flight = require('./models/nosql/flight.model')(mongoose);
    db.Ticket = require('./models/nosql/ticket.model')(mongoose);
    
    insertData.insertData(db.Ticket)

initialize();