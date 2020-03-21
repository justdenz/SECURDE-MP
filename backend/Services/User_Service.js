const {GetUser, GetAllUsers, CreateUser} = require('./User_DB.js')

async function ValidateLogin(username, password){
    let user = await GetUser(username)

    let response = {
        status: '',
        payload: ''
    }

    if(!user){
        response.status= "ERROR",
        response.payload= "User does not exists!"
        
    } else if(user.password != password){
        response.status= "ERROR",
        response.payload= "Incorrect password"
    } else {
        response.status= "OK",
        response.payload= user
    }

    return response
}

async function ValidateAllUsers(){
    let users = await GetAllUsers();
}

async function ValidateCreateUser(first_name, last_name, username, password, email, role_name){
    let user = await CreateUser(first_name, last_name, username, password, email, role_name)

    let response = {
        status: '',
        payload: ''
    }
    
    if(!user){
        response.status = "ERROR",
        response.payload = "There was an error creating the user..."
    } else{
        response.status = "OK"
        response.payload = user
    }
    return response
}

module.exports = {
    ValidateLogin,
    ValidateCreateUser
}