const {GetUserByUsername, 
    GetAllUsers, 
    CreateUser, 
    CheckExistingEmail, 
    CheckExistingUsername, 
    ChangePassword,
    GetUserByRole} = require('./User_DB.js')

const {Register, Login} = require("./UserAction_DB.js")
//returns null if there is no users 
async function ValidateGetAllUsers(){
    let users = await GetAllUsers()

    let response = {
        status: '',
        payload: ''
    }

    if(users === undefined || users.length == 0) {
        response.status = "ERROR"
        response.payload = "There are no users created yet..."
    }
    else if(users){
        response.status = "OK"
        response.payload = users
    }
    else{
        response.status = "ERROR"
        response.payload = "There was an error getting all the users, please try again..."
    }

    return response
}
async function ValidateLogin(username, password){
    let user = await GetUserByUsername(username)

    let response = {
        status: '',
        payload: ''
    }

    if(!user){
        response.status= "ERROR"
        response.payload= "User does not exists!"
        
    } else if(user.password != password){
        response.status= "ERROR"
        response.payload= "Incorrect password"
    } else {
        response.status= "OK",
        response.payload= user

        /*User Action*/
        await Login(user.user_id)
        .then(console.log("Action logged as Login"))
        .catch(err => console.log(err))

    }

    return response
}

async function ValidateGetUserByRole(role){
    let user = await GetUserByRole(role)

    let response = {
        status: '',
        payload: ''
    }

    if(!user){
        response.status= "ERROR"
        response.payload= "There are no " + role + " at this moment..."
        
    } else if(user){
        response.status= "OK"
        response.payload= user
    } else {
        response.status= "ERROR",
        response.payload= "An error has occurred, please try again..."
    }

    return response
}

async function ValidateCreateUser(user_id, first_name, last_name, username, password, email, role_name){
    let response = {
        status: '',
        payload: ''
    }

    //Returns 1 if existing and returns 0 if doesn't exist yet
    let checkUsernameResult = await CheckExistingUsername(username)
    let checkEmailResult = await CheckExistingEmail(email)


    if(checkUsernameResult === 1 && checkEmailResult === 1){
        response.status = "ERROR"
        response.payload = "The email and username already exists, please try another one..."
    } else if(checkUsernameResult === 0 && checkEmailResult === 1){
        response.status = "ERROR"
        response.payload = "The email already exists, please try another one..."
    } else if(checkUsernameResult === 1 && checkEmailResult === 0){
        response.status = "ERROR"
        response.payload = "The username already exists, please try another one..."
    } else{
        let user = await CreateUser(user_id, first_name, last_name, username, password, email, role_name)
        .then(console.log("User created successfully!"))
        .catch(err => console.log("Error in creating user!"))
        if(!user){
            response.status="ERROR"
            response.payload = "There was an error creating the user, please try again..."
        } else{
            response.status = "OK"
            response.payload = user

            /*User Action*/
            await Register(user_id)
            .then(console.log("Action logged as Register!"))
            .catch(err => console.log(err))
        }
    }
    
    return response
}

async function ValidateChangePassword(user_id, new_password){
    let response = {
        status: '',
        payload: ''
    }
    let result = await ChangePassword(user_id, new_password)

    if(result == 1){
        response.status = "OK"
        response.payload = "User has changed password successfully!"
    } else {
        response.status = "ERROR"
        response.payload = "There was an error changing the password, please try again..."
    }

    return response
}

async function ValidateDeleteUser(user_id){
    let response = {
        status: '',
        payload: ''
    }
    let result = await DeleteUser(user_id)

    if(result == 1){
        response.status = "OK"
        response.payload = "User has been deleted successfully"
    } else {
        response.status = "ERROR"
        response.payload = "There was an error deleting the user, please try again..."
    }

    return response
}

module.exports = {
    ValidateLogin,
    ValidateCreateUser,
    ValidateChangePassword,
    ValidateGetAllUsers,
    ValidateGetUserByRole,
    ValidateDeleteUser
}