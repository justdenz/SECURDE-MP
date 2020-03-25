const express = require('express')
const session = require("express-session")
const bodyparser = require('body-parser')
const router = express.Router()

const Book_DB = require('../Services/Book_DB.js')

router.use(function timeLog (req, res, next) {
    next()
})

router.get('/', (req, res) => {
})

module.exports = router

