const db = require('../models/index')

//the user in db.user.etc is singular because it automatically becomes plural
async function getAllUsers(){
    const users = await db.user.findAll({
        raw: true
    })

    return users
}


module.exports.getUsers = {getUsers}