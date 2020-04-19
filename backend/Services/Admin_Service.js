const bcrypt = require('../bcrypt')

const {
    GetAdminByUsername, 
    CreateAdmin,
    ChangePassword,
    CheckExistingUsername,
} = require('./Admin_DB.js')

const {Login} = require("./UserAction_DB.js")

async function ValidateAdminLogin(username, password){
    let admin = await GetAdminByUsername(username)

    let response = {
        status: '',
        payload: ''
    }

    if(!admin){
        response.status= "ERROR"
        response.payload= "Admin does not exists!"
    } else if(!bcrypt.compare(password, admin.password)){
        response.status= "ERROR"
        response.payload= "Incorrect password"
    } else {
        response.status= "OK",
        response.payload= admin
    }

    return response
}

async function ValidateCreateAdmin(username, password){
    let response = {
        status: '',
        payload: ''
    }

    let checkUsernameResult = await CheckExistingUsername(username)
    
    if(checkUsernameResult){
        return null
    } else {
        let admin = await CreateAdmin(username, bcrypt.hash(password))
        .catch(err => console.log("Error Creating Admin: ", err))

        if(!admin){
            response.status="ERROR"
            response.payload = "There was an error creating the admin, please try again..."
        } else{
            response.status = "OK"
            response.payload = admin
        }

        return response
    }
}

async function ValidateChangePassword(admin_id, new_password){
    let response = {
        status: '',
        payload: ''
    }
    let result = await ChangePassword(admin_id, new_password)

    if(result == 1){
        response.status = "OK"
        response.payload = "Admin has changed password successfully!"
    } else {
        response.status = "ERROR"
        response.payload = "There was an error changing the password, please try again..."
    }

    return response
}

module.exports = {
    ValidateAdminLogin,
    ValidateCreateAdmin,
    ValidateChangePassword,
}