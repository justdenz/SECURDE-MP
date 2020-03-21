'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('review', {
    review_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    underscored: true,
    paranoid: true
  })
}