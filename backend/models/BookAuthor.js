'use strict';
const DataTypes = require('Sequelize')
const db = require('./index')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('book_author', {}, {
        underscored: true,
        paranoid: true,
        timestamps: false,
    })
}