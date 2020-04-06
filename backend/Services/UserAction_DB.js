const db = require('../models')

async function Register(user_id){
  await db.user_action.create({
    action_id: 1,
    user_id: user_id,
    book_id: null,
    bookinstance_id: null
  })
}

async function Login(user_id){
  await db.user_action.create({
    action_id: 2,
    user_id: user_id,
    book_id: null,
    bookinstance_id: null
  })
}

async function Logout(user_id){
  await db.user_action.create({
    action_id: 3,
    user_id: user_id,
    book_id: null,
    bookinstance_id: null
  })
}

async function BorrowBook(user_id, book_id, bookinstance_id){
  await db.user_action.create({
    action_id: 4,
    user_id: user_id,
    book_id: book_id,
    bookinstance_id: bookinstance_id
  })
}

async function EditBookInstance(user_id, book_id, bookinstance_id){
  await db.user_action.create({
    action_id: 5,
    user_id: user_id,
    book_id: book_id,
    bookinstance_id: bookinstance_id
  })
}

async function DeleteBookInstance(user_id, book_id, bookinstance_id){
  await db.user_action.create({
    action_id: 6,
    user_id: user_id,
    book_id: book_id,
    bookinstance_id
  })
}

async function AddBookAction(user_id, book_id){
  await db.user_action.create({
    action_id: 7,
    user_id: user_id,
    book_id: book_id
  })
}

async function EditBook(user_id, book_id){
  await db.user_action.create({
    action_id: 8,
    user_id: user_id,
    book_id: book_id
  })
}

async function DeleteBook(user_id, book_id){
  await db.user_action.create({
    action_id: 9,
    user_id: user_id,
    book_id: book_id
  })
}

async function ReviewBook(user_id, book_id){
  await db.user_action.create({
    action_id: 10,
    user_id: user_id,
    book_id: book_id
  })
}

async function AddBookInstanceAction(user_id, book_id, bookinstance_id){
  await db.user_action.create({
    action_id: 11,
    user_id: user_id,
    book_id: book_id,
    bookinstance_id: bookinstance_id
  })
}

async function GetAllUserActionByUser(user_id){
  const action = await db.user_action.findAll({
    raw: true,
    where: {
      user_id: user_id
    },
    paranoid: true,
    attributes:['user_action_id', 'user_id', 'createdAt', 'book_id', 'bookinstance_id', 'action_id']
  })

  var actions 
  for(actions of action){
    let user = await db.user.findOne({
      raw: true,
      where:{
        user_id: actions.user_id
      },
      attributes: ['first_name', 'last_name', 'username']
    })
    let each_action = await db.action.findOne({
      raw: true,
      where:{
        action_id: actions.action_id
      },
      attributes: ['description']
    })
    actions.first_name = user.first_name
    actions.last_name = user.last_name
    actions.username = user.username
    actions.description = each_action.description
  }

  if(action) return action
  return null
}

async function GetAllUserActions(){
  const action = await db.user_action.findAll({
    raw: true,
    paranoid: true,
    attributes:['user_action_id', 'user_id', 'createdAt', 'book_id', 'bookinstance_id', 'action_id']
  })

  var actions 
  for(actions of action){
    let user = await db.user.findOne({
      raw: true,
      where:{
        user_id: actions.user_id
      },
      attributes: ['first_name', 'last_name', 'username']
    })
    let each_action = await db.action.findOne({
      raw: true,
      where:{
        action_id: actions.action_id
      },
      attributes: ['description']
    })
    actions.first_name = user.first_name
    actions.last_name = user.last_name
    actions.username = user.username
    actions.description = each_action.description
  }

  if(action) return action
  return null
}

module.exports={
  Register,
  Login,
  Logout,
  BorrowBook,
  EditBookInstance,
  DeleteBookInstance,
  AddBookAction,
  EditBook,
  DeleteBook,
  ReviewBook,
  AddBookInstanceAction,
  GetAllUserActionByUser,
  GetAllUserActions
}