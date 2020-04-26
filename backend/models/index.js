'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const DataType = require('Sequelize')
const basename = path.basename(__filename);
const config = require('../config/config')
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

const sequelize = new Sequelize(config.db.database, config.db.name, config.db.password, {
  dialect: 'mysql',
  host: config.db.host,
  operatorAliases: false,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.instance_tracker.removeAttribute('id')
db.book_author.removeAttribute('id')

//Associations
db.book.hasMany(db.book_author, {
  foreignKey: {
    name: 'book_id',
    type: DataType.INTEGER(11),
    primaryKey: true,
    allowNull: false,
  }
})
db.author.hasMany(db.book_author, {
  foreignKey: {
    name: 'author_id',
    type: DataType.INTEGER(11),
    primaryKey: true,
    allowNull: false
  }
})

db.user.hasMany(db.review, {
  foreignKey: {
    name: 'user_id',
    type: DataType.INTEGER(11),
    allowNull: false,
  }
})

db.user.hasMany(db.user_action,{
  foreignKey: {
    name: 'user_id',
    type: DataType.INTEGER(11),
    allowNull: true,
    defaultValue: null
  }
})

db.admin.hasMany(db.user_action,{
  foreignKey: {
    name: 'admin_id',
    type: DataType.INTEGER(11),
    allowNull: true,
    defaultValue: null
  }
})

db.book.hasMany(db.review, {
  foreignKey: {
    name: 'book_id',
    type: DataType.INTEGER(11),
    allowNull: false,
  }
})

db.book.hasMany(db.book_instance, {
  foreignKey: {
    name: 'book_id',
    type: DataType.INTEGER(11),
    allowNull: false
  }
})

db.book.hasMany(db.user_action, {
  foreignKey: {
    name: 'book_id',
    type: DataType.INTEGER(11),
    allowNull: true
  }
})

db.book_instance.hasMany(db.user_action,{
  foreignKey:{
    name: 'bookinstance_id',
    type: DataType.INTEGER(11),
    allowNull: true
  }
})

db.action.hasMany(db.user_action,{
  foreignKey: {
    name: 'action_id',
    type: DataType.INTEGER(11),
    allowNull: false
  }
})

db.book_instance.hasMany(db.instance_tracker, {
  foreignKey: {
    name: 'bookinstance_id',
    type: DataType.INTEGER(11),
    primaryKey: true,
    allowNull: false
  }
})

db.user.hasMany(db.instance_tracker, {
  foreignKey: {
    name: 'user_id',
    type: DataType.INTEGER(11),
    primaryKey: true,
    allowNull: false
  }
})

module.exports = db;
