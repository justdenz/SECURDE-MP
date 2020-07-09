const express = require('express')
const bcrypt = require('../bcrypt')
const router = express.Router()

const {
    ValidateLogin,
    ValidateCreateUser,
    ValidateChangePassword,
    ValidateUsername,
    ValidateDeleteUser,
    ValidateGetAllUsers
} = require('../Services/User_Service.js')

const {
    ValidateBorrowBookInstance,
    ValidateGetCurrentBorrowedBooks,
    ValidateGetPreviousBorrowedBooks
} = require('../Services/Book_Service')

const {
    CreateReview,
    DeleteReview,
    GetAllReviewsByUser,
    GetAllReviewsByBook
} = require('../Services/Review_Service')

router.get('/', (req, res) => {
})

router.post("/validate_login", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const result = await ValidateLogin(username, password)
    
    if (result.status == "OK"){
        req.session.user = result.payload
    }

    res.send({
        status: result.status,
        payload: result.payload
    })

})

router.post("/validate_signup", async (req, res) => {
    let user_id = req.body.id_number
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let username = req.body.username
    let password = req.body.password;
    let email = req.body.email
    let role_name = req.body.role_name
    let question = req.body.question
    let answer = req.body.answer

    const result = await ValidateCreateUser(user_id, first_name, last_name, username, password, email, role_name, question, answer)

    res.send({
        status: result.status,
        payload: result.payload
    })
})

router.post("/validate_username", async (req, res) => {
    const username = req.body.username
    const result = await ValidateUsername(username)

    res.send({
        status: result.status,
        payload: result.payload
    })
})

router.post('/change_password', async(req, res) => {
    let result = ValidateChangePassword(req.body.user_id, req.body.new_password)
    res.send({
        status: result.status,
        payload: result.payload
    })
})


router.post('/borrow_bookinstance', async (req, res) => {
    //Put condition to check whether education or manager
    //Only education can access this route
    let result = await ValidateBorrowBookInstance(req.body.bookinstance_id, req.body.user_id)
    res.send({
        status: result.status,
        payload: result.payload
    })
})

router.post('/get_current_books', async (req, res)=> {
    let result = await ValidateGetCurrentBorrowedBooks(req.body.user_id)
    res.send({
        status: result.status,
        payload: result.payload
    })
})

router.post('/get_previous_books', async (req, res)=> {
    let result = await ValidateGetPreviousBorrowedBooks(req.body.user_id)
    res.send({
        status: result.status,
        payload: result.payload
    })
})

module.exports = router

