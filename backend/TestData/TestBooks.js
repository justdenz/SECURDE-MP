const {
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
} = require('../Services/Book_Service')

async function CreateBooks(){
  await ValidateCreateBooks("13 Reasons Why (I Hate Samsung)", "Geek Friends, Inc.", 2017, 117260, [1,2])
  await ValidateCreateBooks("Pimentel, Walang Kokonat", "Smokey Mountains, Inc.", 2020, 41231, [3])
  await ValidateCreateBooks("My Diary Since Creation", 'Before Guttenberg Press, Inc.', 1, 0, [4])
  await ValidateCreateBooks("Delimondo", "Philippine Books Border", 2005, 31211, [5])
  await ValidateCreateBooks("History of One Direction", 'Disbanded Publishers', 2016, 13412, [6])
}

module.exports = {
  CreateBooks
}