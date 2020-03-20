const db = require('../models')

//the user in db.user.etc is singular because it automatically becomes plural
async function GetAllUsers(){
    const users = await db.user.findAll({
        raw: true
    })

    return users
}

async function GetUser(username){
    const user = await db.user.findOne({
        raw: true,
        where: {
            username: username
        }
    })

    if(user) return user
    return null
}

module.exports = {
    GetAllUsers,
    GetUser
}