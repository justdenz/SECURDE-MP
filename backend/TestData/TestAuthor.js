const {
  ValidateGetAllAuthors,
  ValidateCreateAuthor,
  ValidateChangeDetails,
  ValidateDeleteAuthor,
  ValidateGetAuthorByID
} = require('../Services/Author_Service')

async function CreateAuthors(){
  await ValidateCreateAuthor('Schuyler', 'Ng')
  await ValidateCreateAuthor('Johny', 'Mangoseed')
  await ValidateCreateAuthor('Kokonot', 'Wala')
  await ValidateCreateAuthor('Ernile', 'Immortal')
  await ValidateCreateAuthor('Cornbeef', 'Bryant')
  await ValidateCreateAuthor('Rebbbecalyn', 'Lao')
}

module.exports = {
  CreateAuthors
}