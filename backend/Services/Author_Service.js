const {GetAllAuthors, GetAuthorByID, CheckExistingAuthor, DeleteAuthor, CreateAuthor, ChangeDetails} = require('./Author_DB')
const {AddAuthor, DeleteAuthorAction, EditAuthorAction} = require('./UserAction_DB.js')

async function ValidateGetAllAuthors(){
  let authors = await GetAllAuthors()

  let response = {
    status: '',
    payload: ''
  }

  if(authors === undefined || authors.length == 0){
    response.status = "ERROR"
    response.payload = "There are no authors created at this moment..."
  } else if(authors){
    response.status = "OK"
    response.payload = authors
  } else{
    response.status = "ERROR"
    response.payload = "There was an error getting all the authors, please try again..."
  }
  return response
}

async function ValidateGetAuthorByID(author_id){
  let author = await GetAuthorByID(author_id)

  let response = {
      status: '',
      payload: ''
  }

  if(author == null){
    response.status = "ERROR"
    response.payload = "Author does not exists"
  } else if (author){
    response.status = "OK"
    response.payload = author
  } else {
    response.status = "ERROR"
    response.payload = "There was an error, please try again..."
  }

  return response
}

async function ValidateCreateAuthor(first_name, last_name, user_id){
  let response = {
    status: '',
    payload: ''
  }

  let checkAuthorResult = await CheckExistingAuthor(first_name, last_name)

  if(checkAuthorResult === 1){
    response.status = "ERROR"
    response.payload = "The author already exists!"
  } else{
    let author = await CreateAuthor(first_name, last_name)
    if(!author){
      response.status="ERROR"
      response.payload="There was an error creating the author, please try again"
    } else{
      response.status = "OK"
      response.payload = "Author has been added!"

      /*User Action*/
      await AddAuthor(user_id)
      .then(console.log("Action logged as Add Author!"))
      .catch(err=> console.log(err))
    }
  }
  return response
}

async function ValidateChangeDetails(author_id, new_first_name, new_last_name, user_id){
  let response = {
    status: '',
    payload: ''
  }
  let result = await ChangeDetails(author_id, new_first_name, new_last_name)
  if(result == 1){
    response.status = 'OK'
    response.payload = 'Author has been updated successfully!'

    /*User Action*/
    await EditAuthorAction(user_id)
    .then(console.log("Action logged as Edit Author!"))
    .catch(err => console.log(err))
    
  } else{
    response.status = 'ERROR'
    response.payload = "An error has occurred when updating the author... please try again"
  }

  return response
}

async function ValidateDeleteAuthor(author_id, user_id){
  let response = {
    status: '',
    payload: ''
  }
  const result = await DeleteAuthor(author_id)
  if(result == 1){
    response.status = 'OK'
    response.payload = 'Author has been deleted successfully!'

    /*User Action*/
    await DeleteAuthorAction(user_id)
    .then(console.log("Action logged as Delete Author!"))
    .catch(err => console.log(err))
  } else{
    response.status = 'ERROR'
    response.payload = "An error has occurred when deleting the author... please try again"
  }

  return response
}

module.exports = {
  ValidateGetAllAuthors,
  ValidateCreateAuthor,
  ValidateChangeDetails,
  ValidateDeleteAuthor,
  ValidateGetAuthorByID
}