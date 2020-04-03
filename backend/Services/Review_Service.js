const {CreateReview, DeleteReview, GetAllReviewsByUser, GetAllReviewsByBook} = require('./Review_DB.js')
const{ReviewBook} = require("./UserAction_DB.js")

async function ValidateCreateReview(book_id, user_id, comment){
  let response = {
    status: '',
    payload: ''
  }

  let review = await CreateReview(book_id, user_id, comment)

  if(!review){
    response.status="ERROR"
    response.payload="There was an error creating review, please try again"
  } else{
    response.status = "OK"
    response.payload = "Review has been created!"

    /*User Action*/
    await ReviewBook(user_id, book_id)
    .then(console.log("Action logged as Review Book"))
    .catch(err => console.log(err))
  }

  return response
}

async function ValidateDeleteReview(review_id){
  let response = {
    status: '',
    payload: ''
  }
  let result = await DeleteReview(review_id)

  if(result){
      response.status = "OK"
      response.payload = "Review has been deleted successfully"
  } else {
      response.status = "ERROR"
      response.payload = "There was an error deleting the review, please try again..."
  }

  return response
}

async function ValidateGetAllReviewsByUser(user_id){
  let response = {
    status: '',
    payload: ''
  }
  let review = await GetAllReviewsByUser(user_id)
  if(review == null){
    response.status = "ERROR"
    response.payload = " User has no reviews"
  } else if (review){
    response.status = "OK"
    response.payload = review
  } else{
    response.status = "ERROR"
    response.payload = "There was an error, please try again."
  }

  return response
}

async function ValidateGetAllReviewsByBook(book_id){
  let response = {
    status: '',
    payload: ''
  }
  let review = await GetAllReviewsByBook(book_id)
  if(review == null){
    response.status = "ERROR"
    response.payload = " User has no reviews"
  } else if (review){
    response.status = "OK"
    response.payload = review
  } else{
    response.status = "ERROR"
    response.payload = "There was an error, please try again."
  }

  return response
}



module.exports = {
  ValidateCreateReview,
  ValidateDeleteReview,
  ValidateGetAllReviewsByUser,
  ValidateGetAllReviewsByBook
}