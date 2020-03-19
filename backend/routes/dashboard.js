const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const db = require('../db.js')

const User = require('../models/User.js')

router.get('/', (req, res) => {
    res.send(req.session.user)
    
})

module.exports = router

