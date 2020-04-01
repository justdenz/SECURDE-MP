'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const DataType = require('Sequelize')
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

let sequelize = new Sequelize('library', 'root', 'password', {
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
    allowNull: false
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
  onDelete: 'cascade',
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



/*Initialize Action DB*/
db.action.create({action_id: 1, description: "Register"})
.then(console.log("Action Register Initialized"))
.catch(err => console.log("Register is already initialized"))
db.action.create({action_id: 2, description: "Login"})
.then(console.log("Action Login Initialized"))
.catch(err => console.log("Login is already initialized"))
db.action.create({action_id: 3, description: "Logout"})
.then(console.log("Action Logout Initialized"))
.catch(err => console.log("Logout is already initialized"))
db.action.create({action_id: 4, description: "Borrow Book"})
.then(console.log("Action Borrow Book Initialized"))
.catch(err => console.log("Borrow Book is already initialized"))
db.action.create({action_id: 5, description: "Edit Book Instance"})
.then(console.log("Action Edit Book Instance Initialized"))
.catch(err => console.log("Edit Book Instance is already initialized"))
db.action.create({action_id: 6, description: 'Delete Book Instance'})
.then(console.log("Action Delete Book Instance Initialized"))
.catch(err => console.log("Delete Book Instance is already initialized"))
db.action.create({action_id: 7, description: 'Add Book'})
.then(console.log("Action Add Book Initialized"))
.catch(err => console.log("Add Book is already initialized"))
db.action.create({action_id: 8, description: 'Edit Book'})
.then(console.log("Action Edit Book Initialized"))
.catch(err => console.log("Edit Book is already initialized"))
db.action.create({action_id: 9, description: "Delete Book"})
.then(console.log("Action Delete Book Initialized"))
.catch(err => console.log("Delete Book is already initialized"))
db.action.create({action_id: 10,description: "Review Book"})
.then(console.log("Action Review Book Initialized"))
.catch(err => console.log("Review Book is already initialized"))
db.action.create({action_id: 11,description: 'Add Book Instance'})
.then(console.log("Action Add Book Instance Initialized"))
.catch(err => console.log("Add Book Instance is already initialized"))



module.exports = db;
