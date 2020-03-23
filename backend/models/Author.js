'use.strict'

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('author', {
        author_id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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
        }
    }, {
        underscored: true,
        paranoid: true
    })
}