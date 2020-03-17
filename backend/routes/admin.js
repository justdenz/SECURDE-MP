const express = require('express')
const session = require("express-session")
const router = express.Router()

router.use(function timeLog (req, res, next) {
    next()
})

router.get('/', (req, res) => {
    res.send("admin page")
})

module.exports = router

