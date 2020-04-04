const express = require('express')
const router = express.Router()

const{
  ValidateCreateReview,
  ValidateDeleteReview,
  ValidateGetAllReviewsByUser,
  ValidateGetAllReviewsByBook
} = require('../Services/Review_Service.js')

router.post('/', async (req, res)=>{
  const result = await ValidateGetAllReviewsByUser(req.body.user_id)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post('/add_review', async (req, res) =>{
  let result = await ValidateCreateReview(req.body.book_id,req.body.user_id, req.body.comment)
  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post("/delete_review", async (req, res) => {
  let result = await ValidateDeleteReview(req.body.review_id)
  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post('/get_all_review_book', async (req, res) => {
  const result = await ValidateGetAllReviewsByBook(req.body.book_id)

  res.send({
    status: result.status,
    payload: result.payload
  })
})

module.exports = router