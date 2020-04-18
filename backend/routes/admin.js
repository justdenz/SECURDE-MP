const express = require('express')
const session = require("express-session")
const bodyparser = require('body-parser')
const router = express.Router()

const {
    ValidateCreateUser,
    ValidateDeleteUser,
    ValidateChangePassword,
    ValidateGetUserByRole
} = require('../Services/User_Service')

const{
    ValidateGetAllUserActions,
    ValidateGetAllUserActionsByUser
} = require('../Services/UserAction_Service.js')

// router.use(function timeLog (req, res, next) {
//     if(req.session.role_name == "ADMIN"){
//         next()
//     } else {
//         res.send({
//             status: "ERROR",
//             payload: "Only admins have access to these routes..."
//         })
//     }
// })

router.get('/', (req, res) => {
    res.send("API(ADMIN) is working properly")
})

router.get('/get_all_manager', async (req, res) => {
    let result = await ValidateGetUserByRole("MANAGER")
    res.send({
        status: result.status,
        payload: result.payload
    })
})

router.post("/create_manager", async (req, res) => {
    let user_id = req.body.id_number
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let role_name = "MANAGER"
    let question = req.body.question
    let answer = req.body.answer

    const result = await ValidateCreateUser(user_id, first_name, last_name, username, password, email, role_name, question, answer)

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

router.post('/delete_account', async(req, res) => {
    let result = ValidateDeleteUser(req.body.user_id)
    res.send({
        status: result.status,
        payload: result.payload
    })
})


router.get("/all_user_actions", async(req, res) => {
    let result = await ValidateGetAllUserActions()
    res.send({
        status: result.status,
        payload: result.payload
    })
})

router.post("/user_actions", async(req, res) => {
    let result = await ValidateGetAllUserActionsByUser(req.body.user_id)
    res.send({
        status: result.status,
        payload: result.payload
    })
})


module.exports = router

