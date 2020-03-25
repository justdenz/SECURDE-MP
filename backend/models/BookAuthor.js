'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('book_author', {}, {
        underscored: true,
        timestamps: false,
    })
}