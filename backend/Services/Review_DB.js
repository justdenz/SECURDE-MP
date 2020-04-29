const db = require('../models')

async function GetAllReviewsByUser(user_id){
  const reviews = await db.review.findAll({
    raw:true,
    where:{
      user_id: user_id
    },
    paranoid: true,
    attributes:['review_id', 'comment', 'user_id', 'book_id', 'created_at']
  })

  var review
  for(review of reviews){
    let book = await db.book.findOne({
      raw: true,
      where: {
        book_id: review.book_id
      },
      paranoid: false,
      attributes: ['title']
    })
    review.book_title = book.title
    console.log(review.book_title)
  }

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
    attributes:['review_id', 'comment', 'user_id', 'book_id', 'created_at']
  })

  var review
  for(review of reviews){
    let user = await db.user.findOne({
      raw: true,
      where: {
        user_id: review.user_id
      },
      attributes: ['first_name', 'last_name', 'username']
    })
    review.first_name = user.first_name
    review.last_name = user.last_name
    review.username = user.username
  }

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
  await db.review.destroy({
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