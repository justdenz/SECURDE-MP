const db = require('../models')
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

async function GetAllBooks(){
  let books = await db.book.findAll({
    raw: true,
    paranoid: true,
    attributes: ['book_id', 'title', 'publisher', 'year_publication', 'isbn']
  })

  if(books) return books
  return null
}

async function GetBookByID(book_id){
  let book = await db.book.findOne({
    raw: true,
    where: {
      book_id: book_id
    },
    paranoid: true,
    attributes: ['book_id', 'title', 'publisher', 'year_publication', 'isbn']
  })

  if (book) return book
  return null
}

async function AddBook(title, publisher, year_publication, isbn){
  let newBook = await db.book.create({
    title: title,
    publisher: publisher,
    year_publication: year_publication,
    isbn: isbn
  })

  if (newBook) return newBook
  return null
}

async function GetBookAuthorID(book_id){
  let author_ids = await db.book_author.findAll({
    raw: true,
    where: {
      book_id: book_id
    },
    paranoid: false,
    attributes: ['author_id']
  })
  var authors = []
  var id

  for(id of author_ids){
    let tempAuthor = await db.author.findOne({
      raw: true,
      where: {
        author_id: id.author_id
      },
      paranoid: false,
      attributes: ['first_name', 'last_name']
    })
    authors.push(tempAuthor.last_name + ", " + tempAuthor.first_name)
  }
  return authors
}

async function AddBookAuthor(book_id, author_id){
  let result = await db.book_author.create({
    book_id: book_id,
    author_id: author_id
  })

  return result
}

async function DeleteBookAuthors(book_id){
  let result = await db.book_author.destroy({
    where: {
      book_id: book_id
    }
  })
  return result
}

async function UpdateBook(book_id, title, publisher, year_publication, isbn){
  let result = await db.book.update({
    title: title,
    publisher: publisher,
    year_publication: year_publication,
    isbn: isbn
  }, {
    where: {
      book_id: book_id
    }
  })

  return result
}

async function DeleteBookByID(book_id){
  const result = await db.book.destroy({
    where: {
      book_id: book_id
    }
  })
  
  return result
}

async function GetAllBookInstance(){
  let bookInstances = await db.book_instance.findAll({
    raw: true,
    paranoid: true,
    attributes: ['bookinstance_id', 'status', 'book_id']
  })

  return bookInstances
}

async function GetBookInstanceByID(bookinstance_id){
  let bookInstance = await db.book_instance.findOne({
    raw: true,
    where: {
      bookinstance_id: bookinstance_id
    },
    paranoid: true,
    attributes: ['bookinstance_id', 'status', 'book_id']
  })

  if(bookInstance) return bookInstance
  return null
}

async function GetBookInstancesByBookID(book_id){
  let bookInstances = await db.book_instance.findAll({
    raw: true,
    where: {
      book_id: book_id
    },
    paranoid: true,
    attributes: ['bookinstance_id', 'status', 'book_id']
  })

  if(bookInstances) return bookInstances
  return null
}

async function AddBookInstance(book_id){
  let newBookInstance = await db.book_instance.create({
    book_id: book_id
  })

  if (newBookInstance) return newBookInstance
  return null
}

async function UpdateBookInstance(bookinstance_id, status){
  let result = await db.book_instance.update({
    status: status
  }, {
    where: {
      bookinstance_id: bookinstance_id
    }
  })
  return result
}


async function DeleteBookInstanceByID(bookinstance_id){
  let result = await db.book_instance.destroy({
    where: {
      bookinstance_id: bookinstance_id
    }
  })

  return result
}

async function DeleteBookInstanceByBookID(book_id){
  let result = await db.book_instance.destroy({
    where: {
      book_id: book_id
    }
  })

  return result
}

async function AddInstanceTracker(bookinstance_id, user_id){
  let result = await db.instance_tracker.create({
    bookinstance_id: bookinstance_id,
    user_id: user_id
  })

  if(result) return result
  return null
}

async function DeleteInstanceTracker(bookinstance_id){
  let result = await db.instance_tracker.destroy({
    where: {
      bookinstance_id: bookinstance_id
    }
  })

  return result
}

async function GetCurrentBorrowedBooks(user_id){
  let bookinstance_ids = await db.instance_tracker.findAll({
    raw: true,
    where:{
      user_id: user_id
    },
    attributes: ['bookinstance_id']
  })

  var ids = []
  var id
  for(id of bookinstance_ids){
    ids.push(id.bookinstance_id+'')
  }

  let books = await db.book.findAll({
    raw: true,
    where: {
      book_id: {
        [Op.in]: ids
      }
    },
    attributes: ['book_id', 'title']
  })
  
  if(books) return books
  return null
}

async function GetPreviousBorrowedBooks(user_id){
  let bookinstance_ids = await db.instance_tracker.findAll({
    raw: true,
    where:{
      user_id: user_id,
      deleted_at: {
        [Op.not]: null
      }
    },
    paranoid: false,
    attributes: ['bookinstance_id']
  })

  var ids = []
  var id
  for(id of bookinstance_ids){
    ids.push(id.bookinstance_id+'')
  }

  let books = await db.book.findAll({
    raw: true,
    where: {
      book_id: {
        [Op.in]: ids
      }
    },
    attributes: ['book_id', 'title']
  })
  
  if(books) return books
  return null
}

module.exports = {
  GetAllBooks,
  GetBookByID,
  AddBook,
  UpdateBook,
  DeleteBookByID,
  GetBookInstanceByID,
  GetBookInstancesByBookID,
  AddBookInstance,
  UpdateBookInstance,
  DeleteBookInstanceByID,
  DeleteBookInstanceByBookID,
  AddBookAuthor,
  GetAllBookInstance,
  DeleteBookAuthors,
  GetBookAuthorID,
  AddInstanceTracker,
  GetCurrentBorrowedBooks,
  GetPreviousBorrowedBooks,
  DeleteInstanceTracker
}