const db = require('../models')

/*Reb's Questions:
1. Tama ba yung "db.author.something" -> na author dapat siya
    - What does author mean here?
2. Under createauthor, why is author_id being passed lang? (based on user_id)
    - Diba dapat auto generated ang IDs, and increments siya?
    - Ohh for the user, the user_id is being passed because tayo mismo mag iinput ng id number 
3. For DeleteAuthor, is it right na author_id yung parameter? 
    - So like, start with GetAuthorByFullName -> para mahanap and makuha ID -> then delete??
    - React has a way of storing the whole object per element so tuwing idedelete ang isang author, 
    pass the author id of what was clikced lang
 */
async function GetAllAuthors(){
  const authors = await db.author.findAll({
    raw: true,
    attributes:['author_id', 'first_name', 'last_name']
  })

  return authors
}

async function GetAuthorByFullName(first_name, last_name){
  const author = await db.author.findOne({
    raw: true,
    where: {
      first_name: first_name,
      last_name: last_name,
    },
    paranoid: true,
    attributes: ['author_id', 'first_name', 'last_name']
  })

  if(author) return author
  return null
}

async function CheckExistingAuthor(first_name, last_name){
  const author = await db.author.findOne({
    raw: true,
    where: {
      first_name: first_name,
      last_name: last_name
    },
    paranoid: true,
  })

  if(author) return 1
  return 0
}

async function DeleteAuthor(author_id){
  await db.user.destroy({
    where:{
      author_id: author_id
    }
  }).then(console.log('Author ' + author_id + ' has been deleted!'))
  .catch(err => console.log(err))
}

async function CreateAuthor(first_name, last_name){
  const newAuthor = await db.author.create({
      first_name: first_name,
      last_name: last_name
  })

  if(newAuthor) return newAuthor
  return null
}

async function ChangeDetails(author_id, new_first_name, new_last_name){
  await db.author.update({
    first_name: new_first_name,
    last_name: new_last_name
  },{
    where: {
      author_id: author_id
    }
  })
  .then(console.log(author_id + " has successfully changed details!"))
  .catch(err => console.log(err))
}

module.exports = {
  GetAllAuthors,
  GetAuthorByFullName,
  CheckExistingAuthor,
  DeleteAuthor,
  CreateAuthor,
  ChangeDetails
}