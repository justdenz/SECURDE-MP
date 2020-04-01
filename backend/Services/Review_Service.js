const {CreateReview, DeleteReview, GetAllReviewsByUser, GetAllReviewsByBook} = require('./Review_DB.js')
const{ReviewBook} = require("./UserAction_DB.js")

async function ValidateCreateReview(book_id, user_id, comment){
  await CreateReview(book_id, user_id, comment)

  /*User Action*/
  await ReviewBook(user_id, book_id)
  .then(console.log("Action logged as Review Book"))
  .catch(err => console.log(err))
}

async function ValidateDeleteReview(review_id){
  await DeleteReview(review_id)
}

module.exports = {
  ValidateCreateReview,
  ValidateDeleteReview,
}