const db = require('../models')

async function GetAdminByUsername(username){
  const admin = await db.admin.findOne({
      raw: true,
      where: {
          username: username,
      },
      paranoid: true,
      attributes: ['admin_id', 'username', 'password'],
  })

  if(admin) return admin
  return null
}

async function CreateAdmin(username, password){
    const newAdmin = await db.admin.create({
        username: username,
        password: password,
    })

    if(newAdmin) return newAdmin
    return null
}

async function ChangePassword(admin_id, new_password){
    let result = await db.admin.update({
        password: new_password
    }, {
        where: {
            admin_id: admin_id
        }
    })
    
    return result
}

module.exports = {
    GetAdminByUsername,
    CreateAdmin,
    ChangePassword,
}