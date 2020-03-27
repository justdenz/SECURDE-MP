const express = require('express')
const router = express.Router()

const {
  ValidateGetAllAuthors,
  ValidateCreateAuthor,
  ValidateChangeDetails,
  ValidateDeleteAuthor,
  ValidateGetAuthorByID
} = require('../Services/Author_Service.js')

router.get("/", async(req, res) => {
  const result = await ValidateGetAllAuthors()
  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post("/add_author", async (req, res) => {
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  const result = await ValidateCreateAuthor(first_name, last_name)
  res.send({
    status: result.status,
    payload: result.payload
  })
})

router.post("/edit_author", async (req, res) => {
  let author_id = req.body.author_id
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  await ValidateChangeDetails(author_id, first_name, last_name)
  .then(res.send({
    status: "OK",
    payload: "Author has been updated!"
  }))
  .catch(err => {
    res.send({
      status: "ERROR",
      payload: err
    })
  })
})

router.post("/get_author_byid", async (req, res) => {
  let result = await ValidateGetAuthorByID(req.body.author_id)
  res.send({
    status: result.status,
    payload: result.payload
  })
})
module.exports = router