const express = require('express')
const session = require("express-session")
const bodyparser = require('body-parser')
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
    ValidateGetBookInstancesByBookID,
    ValidateBorrowBookInstance
  } = require('../Services/Book_Service.js')


router.use(function timeLog (req, res, next) {
    next()
})

router.get('/', async (req, res) => {
  const result = await ValidateGetAllBooks()

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.get('/get_book', async (req, res) => {
  const result = await ValidateGetBookByID(req.query.book_id)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.get('/create_book', async(req, res) => {
  let title = req.query.title
  let publisher = req.query.publisher
  let year_publication = req.query.year_publication
  let isbn = req.query.isbn
  let authors = req.query.authors

  // let title = 'Title Test'
  // let publisher = 'Publisher Test'
  // let year_publication = 2020
  // let isbn = '123456'
  // let authors = [1, 2]

  const result = await ValidateCreateBooks(title, publisher, year_publication, isbn, authors)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.get('/update_book', async (req, res) => {
  let book_id = req.query.book_id
  let title = req.query.title
  let publisher = req.query.publisher
  let year_publication = req.query.year_publication
  let isbn = req.query.isbn
  let authors = req.query.authors

  const result = await ValidateUpdateBook(book_id, title, publisher, year_publication, isbn, authors)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.get('/delete_book', async (req, res) => {
  const result = await ValidateDeleteBookByID(req.query.book_id)

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

router.get('/get_bookinstance_byid', async (req, res) => {
  const result = await ValidateGetBookInstanceByID(req.query.bookinstance_id)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.get('/get_bookinstance_bybookid', async (req, res) => {
  const result = await ValidateGetBookInstancesByBookID(req.query.book_id)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.get('/add_bookinstance', async (req, res) => {
  const result = await ValidateAddBookInstance(req.query.book_id)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.get('/update_bookinstance', async (req, res) =>{
  //Put condition to check whether education or manager
  //Only manger can access this route
  if(req.session.user.role_name == 'manager'){
    await ValidateUpdateBookInstance(req.query.bookinstance_id)
    .then(res.send({
      status: "OK",
      payload: "Changed book status back to available!"
    }))
    .catch(err => {
      res.send({
        status: "ERROR",
        payload: err
      })
    })
  } else {
    res.send({
      status: "ERROR",
      payload: "Only manager accounts can access this link..."
    })
    .catch(err => {
      res.send({
        status: "ERROR",
        payload: err
      })
    })
  }
})

router.get('/borrow_bookinstance', async (req, res) => {
  //Put condition to check whether education or manager
  //Only education can access this route

  if(req.session.user.role_name == 'education'){
    await ValidateBorrowBookInstance(req.query.bookinstance_id)
    .then(res.send({
      status: "OK",
      payload: "User has borrowed book!"
    }))
    .catch(err => {
      res.send({
        status: "ERROR",
        payload: err
      })
    })
  } else {
    res.send({
      status: "ERROR",
      payload: "Only eduaction accounts can access this link..."
    })
    .catch(err => {
      res.send({
        status: "ERROR",
        payload: err
      })
    })
  }
})

router.get("/delete_bookinstance", async (req, res) => {
  await ValidateDeleteBookInstanceByID(req.query.bookinstance_id)
  .then(result => {
    res.send({
      status: result.status,
      payload: result.payload
    })
  })
  .catch(err => {
    res.send({
      status: "ERROR",
      payload: err
    })
  })

  
})
module.exports = router

