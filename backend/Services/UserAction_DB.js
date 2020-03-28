const db = require('../models')

async function Register(user_id){
  await db.user_action.create({
    action_id: 1,
    user_id: user_id,
    book_id: null
  })
}

async function Login(user_id){
  await db.user_action.create({
    action_id: 2,
    user_id: user_id,
    book_id: null
  })
}

async function Logout(user_id){
  await db.user_action.create({
    action_id: 3,
    user_id: user_id,
    book_id: null
  })
}

async function BorrowBook(user_id, book_id){
  await db.user_action.create({
    action_id: 4,
    user_id: user_id,
    book_id: book_id
  })
}

async function EditBookInstance(user_id, book_id){
  await db.user_action.create({
    action_id: 5,
    user_id: user_id,
    book_id: book_id
  })
}

async function DeleteBookInstance(user_id, book_id){
  await db.user_action.create({
    action_id: 6,
    user_id: user_id,
    book_id: book_id
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

async function AddBookInstanceAction(user_id, book_id){
  await db.user_action.create({
    action_id: 11,
    user_id: user_id,
    book_id: book_id
  })
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
  AddBookInstanceAction
}