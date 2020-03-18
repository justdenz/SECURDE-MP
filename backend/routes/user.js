const express = require('express')
const session = require("express-session")
const bodyparser = require('body-parser')
const router = express.Router()

const Sequelize = require('sequelize')
const db = require('../db.js')

const User = require('../models/User.js')

router.use(function timeLog (req, res, next) {
    next()
})

router.get('/', (req, res) => {
    User.getUsers()
    .then(doc => {
        res.send(doc)
    })
    
})

module.exports = router

