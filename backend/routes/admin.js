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
    res.send("API(ADMIN) is wokring properly")
})

router.get('/get_all_manager', async (req, res) => {
    let result = await ValidateGetUserByRole("MANAGER")
    res.send({
        status: result.status,
        payload: result.payload
    })
})

router.post("/create_manager", async (req, res) => {
    var user_id = req.body.id_number
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    var role_name = "MANAGER"

    const result = await ValidateCreateUser(user_id, first_name, last_name, username, password, email, role_name)

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

module.exports = router

