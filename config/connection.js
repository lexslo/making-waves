const Sequelize = require('sequelize');

require('dotenv').config();

const pe = process.env;

const sequelize = new Sequelize(
    pe.DB_NAME,
    pe.DB_USER,
    pe.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

module.exports = sequelize;