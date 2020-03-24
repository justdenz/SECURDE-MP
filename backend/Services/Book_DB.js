const db = require('../models')

async function CreateBook(title, publisher, year_publication, isbn){
  const newBook = await db.book.create({
    title: title,
    publisher: publisher,
    year_publication: year_publication,
    isbn: isbn
  })

  if(newBook) return newBook
  return null
}

async function DeleteBook(book_id){
  await db.book.destroy({
    where:{
      book_id: book_id
    }
  }).then(console.log('Book ' + book_id + ' has been deleted!'))
  .catch(err => console.log(err))
}

async function CheckExistingBook(isbn){
  const book = await db.book.findOne({
    raw: true,
    where: {
      isbn: isbn
    },
    paranoid: true,
  })

  if(book) return 1
  return 0
}

async function GetAllBooks(){
  const book = await db.book.findAll({
    raw: true,
    attributes: ['book_id', 'title', 'publisher', 'year_publication', 'isbn']
  })
  return book
}

async function GetBookByISBN(isbn){
  const book = await db.book.findOne({
    raw:true,
    where: {
      isbn: isbn
    },
    paranoid: true
  })

  if(book) return 1
  return 0
}

async function ChangeBookDetails(book_id, new_title, new_publisher, new_year_publication, new_isbn){
  await db.book.update({
    title: new_title,
    publisher: new_publisher,
    year_publication = new_year_publication,
    isbn: new_isbn
  },{
    where:{
      book_id: book_id
    }
  })
  .then(console.log(book_id + 'details successfully changed'))
  .catch(err => console.log(err))
}

module.exports = {
  CreateBook,
  DeleteBook,
  CheckExistingBook,
  GetAllBooks,
  ChangeBookDetails,
  GetBookByISBN
}