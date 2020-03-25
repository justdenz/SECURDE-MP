const db = require('../models')

async function GetAllBooks(){
  let books = await db.book.findAll({
    raw: true,
    paranoid: true,
    attributes: ['book_id', 'title', 'publisher', 'year_publication', 'isbn']
  })

  return books
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

async function AddBookAuthor(book_id, author_id){
  await db.book_author.create({
    book_id: book_id,
    author_id: author_id
  })
}

async function DeleteBookAuthors(book_id){
  await db.book_author.destroy({
    where: {
      book_id: book_id
    }
  })
  .then(console.log("Book authors has been deleted!"))
  .catch(err => console.log(err))
}

async function UpdateBook(book_id, title, publisher, year_publication, isbn){
  await db.book.update({
    title: title,
    publisher: publisher,
    year_publication: year_publication,
    isbn: isbn
  }, {
    where: {
      book_id: book_id
    }
  })
  .then(console.log("Book Updated successfully!"))
  .catch(err => console.log(err))
}

async function DeleteBookByID(book_id){
  db.book.destroy({
    where: {
      book_id: book_id
    }
  })
  .then(console.log('Book ' + book_id + ' has been deleted'))
  .catch(err => console.log(err))
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
  let bookInstance = await db.book_instance.findAll({
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
  await db.book_instance.update({
    status: status
  }, {
    where: {
      bookinstance_id: bookinstance_id
    }
  })
  .then(console.log("Book Instance " + bookinstance_id + " has been updated!"))
  .catch(err => console.log(err))
}


async function DeleteBookInstanceByID(bookinstance_id){
  db.book_instance.destroy({
    where: {
      bookinstance_id: bookinstance_id
    }
  })
  .then(console.log('Book Instance ' + bookinstance_id + ' has been deleted'))
  .catch(err => console.log(err))
}

async function DeleteBookInstanceByBookID(book_id){
  db.book_instance.destroy({
    where: {
      book_id: book_id
    }
  })
  .then(console.log('Book Instances of Book ' + book_id + ' has been deleted'))
  .catch(err => console.log(err))
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
  DeleteBookAuthors
}