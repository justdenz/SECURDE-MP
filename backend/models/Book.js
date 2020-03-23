'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('book', {
        book_id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        publisher: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        year_publication: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        },
        isbn: {
            type: DataTypes.INTEGER(13).UNSIGNED,
            required: true,
            allowNull: false,
        }
    }, {
        underscored: true,
        paranoid: true
    })
}