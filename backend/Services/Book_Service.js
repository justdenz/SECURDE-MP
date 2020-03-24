const {CreateBook, ChangeBookDetails, GetAllBooks, GetBookByISBN, CheckExistingBook, DeleteBook} = require('./Book_DB.js')

async function ValidateCreateBook(title, publisher, year_publication, isbn){
  let checkBookResult = await CheckExistingBook(isbn)

  console.log(checkBookResult)

  if(checkBookResult == 1){
    response.status = "DUPLICATE"
    response.payload = "The ISBN already exists"
  } else{
    let book = await CreateBook(title, publisher, year_publication, isbn)
    .then(console.log("Book successfully created!"))
    .catch(err => console.log("Error creating book."))
    if(!book){
      response.status="ERROR"
      response.payload = "Error in creating new book, please try again."
    } else{
      response.status = "OK"
      response.payload = book
    }
  }
  return response
}

async function ValidateDeleteBook(book_id){
  await DeleteBook(book_id)
}

async function ValidateChangeBookDetails(book_id, new_title, new_publisher, new_year_publication, new_isbn){
  await ChangeBookDetails(book_id, new_title, new_publisher, new_year_publication, new_isbn)
}

module.exports{
  ValidateCreateBook,
  ValidateDeleteBook,
  ValidateChangeBookDetails
}