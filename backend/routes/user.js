const express = require('express')
const router = express.Router()

const {
    ValidateLogin,
    ValidateCreateUser,
    ValidateChangePassword,
    ValidateGetAllUsers
} = require('../Services/User_Service.js')

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
    var user_id = req.body.id_number
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    var role_name = req.body.role_name

    const result = await ValidateCreateUser(user_id, first_name, last_name, username, password, email, role_name)

    res.send({
        status: result.status,
        payload: result.payload
    })
})

module.exports = router

