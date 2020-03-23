const express = require('express')
const router = express.Router()

const {
    ValidateLogin,
    ValidateCreateUser,
    ValidateChangePassword
} = require('../Services/User_Service.js')

router.get('/', (req, res) => {
})

function hasSession(req, res, next) {
    if (!req.session.user) {
        //redirect to logout page
    } else{
        next();
    }
};

router.get("/validate_login", async (req, res) => {
    const username = 'user' //req.body.username
    const password = 'password' //req.body.password
    const result = await ValidateLogin(username, password)
    
    if (result.status == "OK"){
        req.session.user = result.payload
    }

    res.send({
        status: result.status,
        payload: result.payload
    })

})

router.get("/validate_signup", async (req, res) => {
    var user_id = req.session.user_id
    var first_name = req.session.first_name
    var last_name = req.session.lastname
    var username = req.session.username
    var password = req.session.password
    var email = req.session.email
    var role_name = req.session.role

    const result = await ValidateCreateUser(user_id, first_name, last_name, username, password, email, role_name)

    if (result.status == "OK"){
        req.session.user = result.payload
    }

    res.send({
        status: result.status,
        payload: result.payload
    })
})

module.exports = router

