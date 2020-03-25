const express = require('express')
const session = require("express-session")
const bodyparser = require('body-parser')
const router = express.Router()

const {
    ValidateGetAllBooks,
    ValidateGetBookByID,
    ValidateCreateBooks,
    ValidateUpdateBook,
    ValidateDeleteBookByID,
    ValidateGetBookInstanceByID,
    ValidateAddBookInstance,
    ValidateUpdateBookInstance,
    ValidateDeleteBookInstanceByID
  } = require('../Services/Book_Service.js')

router.use(function timeLog (req, res, next) {
    next()
})

router.get('/', async (req, res) => {
})

module.exports = router

