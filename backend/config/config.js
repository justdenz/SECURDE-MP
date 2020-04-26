require('dotenv').config()

const name = process.env.NAME
const password = process.env.PASSWORD
const database = process.env.DATABASE
const host = process.env.HOST
const node_env = process.env.NODE_ENV
const admin_username = process.env.ADMIN_USERNAME
const admin_password = process.env.ADMIN_PASSWORD

const config = {
  dev: {
    db: {
      name,
      password,
      database,
      host,
    },
    admin: {
      admin_username,
      admin_password
    }
  },
  test: {},
  prod: {}
}

module.exports = config[node_env]