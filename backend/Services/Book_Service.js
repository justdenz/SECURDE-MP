const {
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
  GetBookAuthorID
} = require("./Book_DB.js")

async function ValidateGetAllBooks(){
  let books = await GetAllBooks()

  let response = {
      status: '',
      payload: ''
  }

  if(books === undefined || books.length == 0) {
    response.status = "ERROR"
    response.payload = "There are no books created at this moment..."
  }
  else if(books){
    var book
    for(book of books){
      book.authors = await GetBookAuthorID(book.book_id)
    }
    response.status = "OK"
    response.payload = books
  }
  else{
    response.status = "ERROR"
    response.payload = "There was an error getting all the books, please try again..."
  }
  return response
}

async function ValidateGetBookByID(book_id){
  let book = await GetBookByID(book_id)

  let response = {
      status: '',
      payload: ''
  }

  if(book == null){
    response.status = "ERROR"
    response.payload = "Book does not exists"
  } else if (book){
    book.authors = await GetBookAuthorID(book.book_id)
    response.status = "OK"
    response.payload = book
  } else {
    response.status = "ERROR"
    response.payload = "There was an error, please try again..."
  }

  return response
}

async function ValidateCreateBooks(title, publisher, year_publication, isbn, author_ids){
  let response = {
    status: '',
    payload: ''
  }

  let book = await AddBook(title, publisher, year_publication, isbn)
  
  if(!book){
    response.status="ERROR"
    response.payload = "There was an error creating the book, please try again..."
  } else{
    author_ids.forEach(async id => {
      await AddBookAuthor(book.book_id, id)
    });
    response.status = "OK"
    response.payload = "Book has been created!"
  }

  return response
}

async function ValidateUpdateBook(book_id, title, publisher, year_publication, isbn, author_ids){
  let response = {
    status: '',
    payload: ''
  }

  await UpdateBook(book_id, title, publisher, year_publication, isbn)
  await DeleteBookAuthors(book_id)
  let updatedBook = await GetBookByID(book_id)
  if(!updatedBook){
    response.status="ERROR"
    response.payload = "There was an error updating the book, please try again..."
  } else{
    author_ids.forEach(async id => {
      await AddBookAuthor(book_id, id)
    });
    response.status = "OK"
    response.payload = "Book has been updated!"
  }

  return response
}

//when de
async function ValidateDeleteBookByID(book_id){

  let response = {
    status: '',
    payload: ''
  }
  let books = await GetBookInstancesByBookID(book_id)

  if(books === undefined || books.length == 0){
    await DeleteBookByID(book_id)
    response.status = 'OK'
    response.payload = "Book " + book_id + " has been deleted!"
  } else if(books){

    var status = books.forEach(element => {
        if(element.status == 0){
          return 'reserved'
        }
      })

    if(status == 'reserved'){
      response.status = 'ERROR'
      response.payload = "Cannot delete book because someone an instance of it is still reserved.."
    } else{
      await DeleteBookByID(book_id)
      await DeleteBookInstanceByBookID(book_id)
      response.status = 'OK'
      response.payload = "Book " + book_id + " has been deleted!"
    }

  } else{
    response.status = 'ERROR'
    response.payload = 'An error has occurred, please try again..'
  }

  return response
}

async function ValidateGetBookInstanceByID(bookinstance_id){
  let response = {
    status: '',
    payload: ''
  }

  let bookInstance = await GetBookInstanceByID(bookinstance_id)

  if(bookInstance == null){
    response.status = "ERROR"
    response.payload = "Book Instance does not exists"
  } else if (bookInstance){
    response.status = "OK"
    response.payload = bookInstance
  } else {
    response.status = "ERROR"
    response.payload = "There was an error, please try again..."
  }

  return response
}

async function ValidateGetBookInstancesByBookID(book_id){
  let response = {
    status: '',
    payload: ''
  }

  let bookInstances = await GetBookInstancesByBookID(book_id)

  if(bookInstances == null){
    response.status = "ERROR"
    response.payload = "There is no instances for this book"
  } else if (bookInstances){
    response.status = "OK"
    response.payload = bookInstances
  } else {
    response.status = "ERROR"
    response.payload = "There was an error, please try again..."
  }

  return response
}

async function ValidateAddBookInstance(book_id){
  let response = {
    status: '',
    payload: ''
  }

  let newBookInstance = await AddBookInstance(book_id)

  if(!newBookInstance){
    response.status = 'ERROR',
    response.payload = "There was error in adding book instance, try again..."
  } else {
    response.status = "OK",
    response.payload = "Book instance has been added successfully!"
  }

  return response
}

async function ValidateUpdateBookInstance(bookinstance_id){
  const status = {
    AVAILABLE: '1',
    RESERVED: '0'
  }
  await UpdateBookInstance(bookinstance_id, status.AVAILABLE)
}

async function ValidateBorrowBookInstance(bookinstance_id){
  const status = {
    AVAILABLE: '1',
    RESERVED: '0'
  }
  await UpdateBookInstance(bookinstance_id, status.RESERVED)
}

async function ValidateDeleteBookInstanceByID(bookinstance_id){
  let response = {
    status: '',
    payload: ''
  }
  let bookInstance = await GetBookInstanceByID(bookinstance_id)
  if(bookInstance.status == 0){
    response.status = 'ERROR'
    response.payload = "This book instance is being reserved by someone..."
  } else{
    await DeleteBookInstanceByID(bookinstance_id)
    response.status = "OK"
    response.payload = "Book instance has been deleted!"
  }

  return response
}

async function ValidateGetAllBookInstance(){
  let bookInstances = await GetAllBookInstance()

  let response = {
      status: '',
      payload: ''
  }

  if(bookInstances === undefined || bookInstances.length == 0) {
      response.status = "ERROR"
      response.payload = "There are no instances created at this moment..."
  }
  else if(bookInstances){
      response.status = "OK"
      response.payload = bookInstances
  }
  else{
      response.status = "ERROR"
      response.payload = "There was an error getting all the instances, please try again..."
  }
  return response
}


module.exports = {
  ValidateGetAllBooks,
  ValidateGetBookByID,
  ValidateCreateBooks,
  ValidateUpdateBook,
  ValidateDeleteBookByID,
  ValidateGetBookInstanceByID,
  ValidateAddBookInstance,
  ValidateUpdateBookInstance,
  ValidateDeleteBookInstanceByID,
  ValidateGetAllBookInstance,
  ValidateGetBookInstancesByBookID,
  ValidateBorrowBookInstance
}