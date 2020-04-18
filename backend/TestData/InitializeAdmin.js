const {
  ValidateCreateAdmin,
} = require('../Services/Admin_Service')

async function CreateAdmin(){
  await ValidateCreateAdmin('admin', 'password')
}

module.exports = {
  CreateAdmin
}