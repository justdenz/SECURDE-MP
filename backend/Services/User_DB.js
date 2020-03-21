const db = require('../models')

//the user in db.user.etc is singular because it automatically becomes plural
async function GetAllUsers(){
    const users = await db.user.findAll({
        raw: true,
        attributes: ['user_id', 'first_name', 'last_name', 'username', 'password', 'email', 'role_name']
    })

    return users
}

async function GetUser(username){
    const user = await db.user.findOne({
        raw: true,
        where: {
            username: username,
        },
        paranoid: true,
        attributes: ['user_id', 'first_name', 'last_name', 'username', 'password', 'email', 'role_name'],
    })

    if(user) return user
    return null
}

async function CreateUser(first_name, last_name, username, password, email, role_name){
    const newUser = await db.user.create({
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: password,
        email: email,
        role_name: role_name
    })

    if(newUser) return newUser
    return null
}

module.exports = {
    GetAllUsers,
    GetUser,
    CreateUser
}