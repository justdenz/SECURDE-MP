'use.strict'
const DataTypes = require('Sequelize')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('author', {
        author_id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false
        },
        deleted_at: {
            type: DataTypes.DATE
        }
    }, {
        underscored: true,
        paranoid: true,
        timestamps: false
    })
}