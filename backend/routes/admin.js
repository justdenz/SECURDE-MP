const express = require('express')
const session = require("express-session")
const bodyparser = require('body-parser')
const router = express.Router()

router.use(function timeLog (req, res, next) {
    next()
})

router.get('/', (req, res) => {
    res.send("API(ADMIN) is wokring properly")
})

module.exports = router

