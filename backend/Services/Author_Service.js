const {GetAllAuthors, GetAuthorByFullName, CheckExistingAuthor, DeleteAuthor, CreateAuthor, ChangeDetails} = require('./Author_DB')

async function ValidateCreateAuthor(author_id, first_name, last_name){
  let response = {
    status: '',
    payload: ''
  }

  let checkAuthorResult = await CheckExistingAuthor(first_name, last_name)

  if(checkAuthorResult === 1){
    response.status = "DUPLICATE"
    response.payload = "The author already exists!"
  } else{
    let author = await CreateAuthor(first_name, last_name)
    .then(Console.log("Successfully created Author!"))
    .catch(err => console.log("Error in creating Author!"))
    if(!author){
      response.status="ERROR"
      response.payload="There was an error creating the author, please try again"
    } else{
      response.status = "OK"
      response.payload = author
    }
  }
  return response
}

async function ValidateChangeDetails(author_id, new_first_name, new_last_name){
  await ChangeDetails(author_id, new_first_name, new_first_name)
}

async function ValidateDeleteAuthor(author_id){
  await DeleteAuthor(author_id)
}

module.exports = {
  ValidateCreateAuthor,
  ValidateChangeDetails,
  ValidateDeleteAuthor
}