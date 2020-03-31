const db = require('../models')

//the user in db.user.etc is singular because it automatically becomes plural
async function GetAllUsers(){
    const users = await db.user.findAll({
        raw: true,
        attributes: ['user_id', 'first_name', 'last_name', 'username', 'password', 'email', 'role_name']
    })

    return users
}

async function GetUserByUsername(username){
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

async function GetUserByRole(role){
    const user = await db.user.findOne({
        raw: true,
        where: {
            role_name: role,
        },
        paranoid: true,
        attributes: ['user_id', 'first_name', 'last_name', 'username', 'password', 'email', 'role_name'],
    })

    if(user) return user
    return null
}

async function CheckExistingEmail(email){
    const user = await db.user.findOne({
        raw: true,
        where: {
            email: email
        },
        paranoid: true,
    })

    if(user) return 1
    return 0
}

async function CheckExistingUsername(username){
    const user = await db.user.findOne({
        raw: true,
        where: {
            username: username
        },
        paranoid: true,
    })

    if(user) return 1
    return 0
}

async function DeleteUser(user_id){
    await db.user.destroy({
        where:{
            user_id: user_id
        }
    }).then(console.log('User' + user_id + 'has been deleted!'))
    .catch(err => console.log(err))
}

async function CreateUser(user_id, first_name, last_name, username, password, email, role_name){
    const newUser = await db.user.create({
        user_id: user_id,
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

async function ChangePassword(user_id, new_password){
    await db.user.update({
        password: new_password
    }, {
        where: {
            user_id: user_id
        }
    })
    .then(console.log(user_id + "has changed password successfully!"))
    .catch(err => console.log(err))
}

module.exports = {
    GetAllUsers,
    GetUserByUsername,
    CreateUser,
    CheckExistingEmail,
    CheckExistingUsername,
    ChangePassword,
    GetUserByRole
}