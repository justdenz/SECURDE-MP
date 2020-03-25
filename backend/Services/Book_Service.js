const {
  GetAllBooks,
  GetBookByID,
  AddBook,
  UpdateBook,
  DeleteBookByID,
  GetBookInstanceByID,
  GetBookInstanceByBookID,
  AddBookInstance,
  UpdateBookInstance,
  DeleteBookInstanceByID,
  DeleteBookInstanceByBookID
} = require("./Book_DB.js")

async function ValidateGetAllBooks(){
  let books = await GetAllBooks()

  let response = {
      status: '',
      payload: ''
  }

  if(books === undefined || books.length == 0) {
      response.status = "EMPTY"
      response.payload = "There are no books created yet..."
  }
  else if(books){
      response.status = "OK"
      response.payload = books
  }
  else
      response.status = "ERROR"
      response.payload = "There was an error getting all the books, please try again..."

  return response
}

async function ValidateGetBookByID(book_id){
  let book = await GetBookByID(book_id)

  let response = {
      status: '',
      payload: ''
  }

  if(book == null){
    response.status = "EMPTY"
    response.payload = "Book does not exists"
  } else if (book){
    response.status = "OK"
    response.payload = book
  } else {
    response.status = "ERROR"
    response.payload = "There was an error, please try again..."
  }

  return response
}

async function ValidateCreateBooks(title, publisher, year_publication, isbn){
  let response = {
    status: '',
    payload: ''
  }

  let book = await AddBook(title, publisher, year_publication, isbn)
  
  if(!book){
    response.status="ERROR"
    response.payload = "There was an error creating the book, please try again..."
  } else{
      response.status = "OK"
      response.payload = book
  }

  return response
}

async function ValidateUpdateBook(book_id, title, publisher, year_publication, isbn){
  await UpdateBook(book_id, title, publisher, year_publication, isbn)
}

//when de
async function ValidateDeleteBookByID(book_id){

  let response = {
    status: '',
    payload: ''
  }
  let books = await GetBookInstanceByBookID(book_id)

  if(books === undefined || books.length == 0){
    await DeleteBookByID(book_id)
    response.status = 'OK'
    response.payload = "Book " + book_id + " has been deleted!"
  } else if(books){

    var status = books.array.forEach(element => {
        if(element.status == 0){
          return 'reserved'
        }
      })

    if(status == 'reserved'){
      response.status = 'ERROR'
      response.payload = "Cannot delete book because someone an instance of it is still reserved.."
    } else{
      response.status = 'OK'
      response.payload = "Book " + book_id + " has been deleted!"
    }

  } else{
    response.status = 'ERROR'
    response.payload = 'An error has occurred, please try again..'
  }

  return response
}