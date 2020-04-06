const{GetAllUserActionByUser, GetAllUserActions} = require('./UserAction_DB.js')

async function ValidateGetAllUserActions(){
  let userActions = await GetAllUserActions()
  let response = {
      status: '',
      payload: ''
  }

  if(userActions === undefined || userActions.length == 0) {
      response.status = "ERROR"
      response.payload = "There are no instances created at this moment..."
  }
  else if(userActions){
      response.status = "OK"
      response.payload = userActions
  }
  else{
      response.status = "ERROR"
      response.payload = "There was an error getting all the instances, please try again..."
  }
  return response
}

async function ValidateGetAllUserActionsByUser(user_id){
  let userActions = await GetAllUserActionByUser(user_id)
  let response = {
      status: '',
      payload: ''
  }

  if(userActions === undefined || userActions.length == 0) {
      response.status = "ERROR"
      response.payload = "There are no instances created at this moment..."
  }
  else if(userActions){
      response.status = "OK"
      response.payload = userActions
  }
  else{
      response.status = "ERROR"
      response.payload = "There was an error getting all the instances, please try again..."
  }
  return response
}

module.exports = {
  ValidateGetAllUserActions,
  ValidateGetAllUserActionsByUser
}