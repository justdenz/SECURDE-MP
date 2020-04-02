const express = require('express')
const router = express.Router()

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
    ValidateGetBookInstancesByBookID
  } = require('../Services/Book_Service.js')


// router.use(function timeLog (req, res, next) {
//   if(req.session.user.role_name == "MANAGER"){
//     next()
//   } else {
//     res.send({
//       status: "ERROR",
//       payload: "Only managers can access this link..."
//     })
//   }
// })

router.get('/', async (req, res) => {
  const result = await ValidateGetAllBooks()
  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post('/get_book', async (req, res) => {
  const result = await ValidateGetBookByID(req.body.book_id)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post('/create_book', async(req, res) => {
  let title = req.body.title
  let publisher = req.body.publisher
  let year_publication = req.body.year_publication
  let isbn = req.body.isbn
  let authors = req.body.authors
  let user_id = req.session.user_id

  // let title = 'Title Test'
  // let publisher = 'Publisher Test'
  // let year_publication = 2020
  // let isbn = '123456'
  // let authors = [1, 2]

  const result = await ValidateCreateBooks(user_id, title, publisher, year_publication, isbn, authors)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post('/update_book', async (req, res) => {
  let book_id = req.body.book_id
  let title = req.body.title
  let publisher = req.body.publisher
  let year_publication = req.body.year_publication
  let isbn = req.body.isbn
  let authors = req.body.authors
  let user_id = req.session.user_id

  const result = await ValidateUpdateBook(user_id, book_id, title, publisher, year_publication, isbn, authors)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post('/delete_book', async (req, res) => {
  const result = await ValidateDeleteBookByID(req.body.book_id)
  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.get('/get_all_bookinstances', async (req, res) => {
  const result = await ValidateGetAllBookInstance()

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post('/get_bookinstance_byid', async (req, res) => {
  const result = await ValidateGetBookInstanceByID(req.body.bookinstance_id)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post('/get_bookinstance_bybookid', async (req, res) => {
  const result = await ValidateGetBookInstancesByBookID(req.body.book_id)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post('/add_bookinstance', async (req, res) => {
  const result = await ValidateAddBookInstance(req.body.book_id)
  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post('/update_bookinstance', async (req, res) =>{
  let result = await ValidateUpdateBookInstance(req.body.bookinstance_id, req.body.status, req.body.user_id)
  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post("/delete_bookinstance", async (req, res) => {
  let result = await ValidateDeleteBookInstanceByID(req.body.bookinstance_id)
  res.send({
    status: result.status,
    payload: result.payload
  })
})
module.exports = router

