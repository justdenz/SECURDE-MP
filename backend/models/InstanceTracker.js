'use strict'

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('instance_tracker', {}, {
      underscored: true,
      paranoid: true
  })
}