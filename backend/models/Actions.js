'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('action',{
    action_id:{
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    }
  }, {
    underscored: true,
    paranoid: true
  })
}