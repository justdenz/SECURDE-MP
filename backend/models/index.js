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

// /*Initialize DB*/
// //Author
// db.author.create({author_id: 1, first_name: "Rick", last_name: "Riordan"})
// .then()
// .catch(err=>console.log)
// db.author.create({author_id: 2, first_name: "Jennifer", last_name: "Niven"})
// .then()
// .catch(err=>console.log)
// db.author.create({author_id: 3, first_name: "Jenny", last_name: "Han"})
// .then()
// .catch(err=>console.log)

// //Book
// db.book.create({book_id: 1, title: "Percy Jackson", publisher: "Disney", year_publication: 2012, isbn:1111111111, call_number: 111})
// .then()
// .catch(err=>console.log)
// db.book.create({book_id: 2, title: "Bright Places", publisher: "Rainbow", year_publication: 2014, isbn:1111111112, call_number: 112})
// .then()
// .catch(err=>console.log)
// db.book.create({book_id: 3, title: "All the Boys", publisher: "Rainbow", year_publication: 2013, isbn:1111111122, call_number: 121})
// .then()
// .catch(err=>console.log)

// //Book Authors
// db.book_author.create({book_id: 1, author_id:1})
// .then()
// .catch(err=>console.log)
// db.book_author.create({book_id: 2, author_id:2})
// .then()
// .catch(err=>console.log)
// db.book_author.create({book_id: 3, author_id:3})
// .then()
// .catch(err=>console.log)
// db.book_author.create({book_id: 3, author_id:2})
// .then()
// .catch(err=>console.log)

// //Users
// db.user.create({user_id:1, last_name: "Lao", first_name:"Rebecalyn", username:"Reb", password:"Lao", email:"reb.lao@dlsu.edu.ph", question:"Who was your childhood hero?", answer:"Supergirl", role_name: "Education"})
// .then()
// .catch(err=>console.log)
// db.user.create({user_id:2, last_name: "Co", first_name:"Denzel", username:"Denz", password:"Co", email:"denz.co@dlsu.edu.ph", question:"Who was your childhood hero?", answer:"Supergirl", role_name: "Manager"})
// .then()
// .catch(err=>console.log)
// db.user.create({user_id:3, last_name: "Ng", first_name:"Schuyler", username:"Sky", password:"Ng", email:"reb.lao@dlsu.edu.ph", question:"Who was your childhood hero?", answer:"Supergirl", role_name: "Education"})
// .then()
// .catch(err=>console.log)

module.exports = db;
