'use strict';

module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('admin', {
    admin_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    }, {
        underscored: true,
        paranoid: true,
    })
}