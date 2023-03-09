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
        await sequelize.sync({ alter: true });
}

initialize();