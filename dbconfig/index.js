const dbConfig = require('./db.config.js');
const {Sequelize} = require('sequelize');

module.exports = db = {};

async function initialize() {
    const sequelize = new Sequelize(
        dbConfig.DB, 
        dbConfig.USER,
        dbConfig.PASSWORD, {
            host: dbConfig.HOST,
            dialect: dbConfig.dialect,
            operationsAliases: false,
        }
        );
        db.User = require('./models/test.model')(sequelize, Sequelize);
        await sequelize.sync({ alter: true });
}

initialize();