'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('book_instance', {
    bookinstance_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
  status: {
    type: DataTypes.ENUM('1', '0'),
    require: true,
    allowNull: false,
    defaultValue: '1'
  }
  }, {
    underscored: true,
    paranoid: true
})
}