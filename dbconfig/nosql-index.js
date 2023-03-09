const nosqlDbConfig = require('./nosql-db.config.js');
const mongoose =  require("mongoose");

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

initialize();