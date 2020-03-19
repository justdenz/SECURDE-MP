const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const db = require('../db.js')

const User = require('../models/User.js')

router.get('/', (req, res) => {
    var user = req.session.user
    res.send(user.user_id+"")
    
})

module.exports = router

