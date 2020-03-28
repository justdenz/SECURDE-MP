'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_action', {
    user_action_id: {
      type: DataTypes.INTEGER(11),
      primaryKey:true,
      autoIncrement: true,
      allowNull: false
    }
  })
}