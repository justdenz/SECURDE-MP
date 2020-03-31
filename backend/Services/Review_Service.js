const {CreateReview, DeleteReview, GetAllReviewsByUser, GetAllReviewsByBook} = require('./Review_DB.js')

async function ValidateCreateReview(book_id, user_id, comment){
  await CreateReview(book_id, user_id, comment)
}

async function ValidateDeleteReview(review_id){
  await DeleteReview(review_id)
}

module.exports = {
  ValidateCreateReview,
  ValidateDeleteReview,
}