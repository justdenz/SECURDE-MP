var Sequelize = require('sequelize');

module.exports = new Sequelize('library', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  operatorAliases: false,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})
