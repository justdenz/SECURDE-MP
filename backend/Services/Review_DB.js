const db = require('../models')

async function GetAllReviewsByUser(user_id){
  const reviews = await db.review.findAll({
    raw:true,
    where:{
      user_id: user_id
    },
    paranoid: true,
    attributes:['review_id', 'comment', 'user_id', 'book_id']
  })

  if(reviews) return reviews
  return null
}

async function GetAllReviewsByBook(book_id){
  const reviews = await db.review.findAll({
    raw:true,
    where:{
      book_id: book_id
    },
    paranoid: true,
    attributes:['review_id', 'comment', 'user_id', 'book_id']
  })

  if(reviews) return reviews
  return null
}

async function CreateReview(book_id, user_id, comment){
  const newReview = await db.review.create({
    book_id: book_id,
    user_id: user_id,
    comment: comment
  })

  if(newReview) return newReview
  return null
}

async function DeleteReview(review_id){
  awaitdb.review.destroy({
    where:{
      review_id: review_id
    }
  }).then (console.log('Review ' + review_id + ' has been deleted!'))
  .catch(err => console.log(err))
}

module.exports = {
  CreateReview,
  DeleteReview,
  GetAllReviewsByUser,
  GetAllReviewsByBook
}