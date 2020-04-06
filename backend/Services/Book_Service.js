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
  GetBookAuthorID,
  AddInstanceTracker,
  GetCurrentBorrowedBooks,
  GetPreviousBorrowedBooks,
  DeleteInstanceTracker
} = require("./Book_DB.js")

const {BorrowBook, EditBookInstance, DeleteBookInstance, AddBookAction, EditBook, DeleteBook} = require("./UserAction_DB.js")

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

async function ValidateCreateBooks(user_id, title, publisher, year_publication, isbn, author_ids){
  let response = {
    status: '',
    payload: ''
  }

  let book = await AddBook(title, publisher, year_publication, isbn, user_id)
  
  if(!book){
    response.status="ERROR"
    response.payload = "There was an error creating the book, please try again..."
  } else{
    author_ids.forEach(async id => {
      await AddBookAuthor(book.book_id, id)
    });
    response.status = "OK"
    response.payload = "Book has been created!"

    /*User Action*/
    await AddBookAction(user_id, book.book_id)
    .then(console.log("Action logged as Add Book!"))
    .catch(err => console.log(err))
  }

  return response
}

async function ValidateUpdateBook(user_id, book_id, title, publisher, year_publication, isbn, author_ids){
  let response = {
    status: '',
    payload: ''
  }

  let updateBookResult = await UpdateBook(book_id, title, publisher, year_publication, isbn)
  if(updateBookResult == 1){
    let deleteBookAuthorResult = await DeleteBookAuthors(book_id)
    if(deleteBookAuthorResult > 0){
      let updatedBook = await GetBookByID(book_id)
      if(!updatedBook){
        response.status="ERROR"
        response.payload = "There was an error updating the book, please try again..."
      } else{
        var id
        for(id of author_ids){
          await AddBookAuthor(book_id, id)
        }
        response.status = "OK"
        response.payload = "Book has been updated!"

         /*User Action*/
        await EditBook(user_id, book_id)
        .then(console.log("Action logged as Edit Book!"))
        .catch(err => console.log(err))
      }
    } else {
      response.status="ERROR"
      response.payload = "There might be an error updating the book, please try again..."
    }
  } else {
    response.status="ERROR"
    response.payload = "There was an error updating the book, please try again..."
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
    const result = await DeleteBookByID(book_id)
    if(result > 0){
      response.status = 'OK'
      response.payload = "Book " + book_id + " has been deleted!"
    }else{
      response.status = 'ERROR'
      response.payload = 'An error has occurred in deleting the book, please try again..'
    }
  } else if(books){

    var bookStatus 
    var book
    for(book of books){
      if(book.status == '0'){
        bookStatus = 'reserved'
      }
    }

    if(bookStatus == 'reserved'){
      response.status = 'ERROR'
      response.payload = "Cannot delete book because someone an instance of it is still reserved.."
    } else{
      let instanceResult = await DeleteBookInstanceByBookID(book_id)

      if(instanceResult > 0){
        let bookResult = await DeleteBookByID(book_id)

        if(bookResult > 0){
          response.status = 'OK'
          response.payload = "Book " + book_id + " has been deleted!"
        }else{
          response.status = 'ERROR'
          response.payload = 'An error has occurred in deleting the book, please try again..'
        }

      }else{
        response.status = 'ERROR'
        response.payload = 'An error has occurred in deleting the book, please try again..'
      }
    }

  } else{
    response.status = 'ERROR'
    response.payload = 'An error has occurred in deleting the book, please try again..'
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

async function ValidateUpdateBookInstance(bookinstance_id, status, user_id){
  let response = {
    status: '',
    payload: ''
  }
  const instance_status = {
    AVAILABLE: '1',
    RESERVED: '0'
  }
  let statusUpdate
  let result
  if(status == 1){
    result = await UpdateBookInstance(bookinstance_id, instance_status.AVAILABLE)
    await DeleteInstanceTracker(bookinstance_id)
    statusUpdate = "AVAILABLE"
  }else if(status == 0){
    result = await UpdateBookInstance(bookinstance_id, instance_status.RESERVED)
    await AddInstanceTracker(bookinstance_id, user_id)
    statusUpdate = "RESERVED"
  }

  if(result > 0){
    response.status = 'OK',
    response.payload = "Book instance was changed to " + statusUpdate
  } else {
    response.status = "ERROR"
    response.payload = "There was an error in updating book instance, please try again..."
  }
  
  return response
}

async function ValidateBorrowBookInstance(bookinstance_id, user_id){
  let response = {
    status: '',
    payload: ''
  }
  const status = {
    AVAILABLE: '1',
    RESERVED: '0'
  }
  let result = await UpdateBookInstance(bookinstance_id, status.RESERVED)

  if(result > 0){
    await AddInstanceTracker(bookinstance_id, user_id)
    response.status = 'OK',
    response.payload = "Student borrowed book!"
  }else {
    response.status = "ERROR"
    response.payload = "There was an error, please try again..."
  }

  return response
}

async function ValidateDeleteBookInstanceByID(bookinstance_id){
  let response = {
    status: '',
    payload: ''
  }
  let bookInstance = await GetBookInstanceByID(bookinstance_id)
  if(bookInstance.status == '0'){
    response.status = 'ERROR'
    response.payload = "This book instance is being reserved by someone..."
  } else{
    let result = await DeleteBookInstanceByID(bookinstance_id)
    if(result > 0){
      response.status = "OK"
      response.payload = "Book instance has been deleted!"
    }else {
      response.status = "ERROR"
      response.payload = "There was an error in deleting the book instance, please try again..."
    }
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

async function ValidateGetCurrentBorrowedBooks(user_id){
  let result = await GetCurrentBorrowedBooks(user_id)

  let response = {
    status: '',
    payload: ''
  }

  if(result === undefined || result.length == 0) {
      response.status = "ERROR"
      response.payload = "You have not borrowed any books at this moment..."
  }
  else if(result){
      response.status = "OK"
      response.payload = result
  }
  else{
      response.status = "ERROR"
      response.payload = "There was an error getting your books, please try again..."
  }
  return response
}

async function ValidateGetPreviousBorrowedBooks(user_id){
  let result = await GetPreviousBorrowedBooks(user_id)

  let response = {
    status: '',
    payload: ''
  }

  if(result === undefined || result.length == 0) {
      response.status = "ERROR"
      response.payload = "You have not borrowed any books before..."
  }
  else if(result){
      response.status = "OK"
      response.payload = result
  }
  else{
      response.status = "ERROR"
      response.payload = "There was an error getting your previous books, please try again..."
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
  ValidateBorrowBookInstance,
  ValidateGetCurrentBorrowedBooks,
  ValidateGetPreviousBorrowedBooks
}