const {GetUser} = require('./User_DB.js')

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

module.exports = {
    ValidateLogin
}