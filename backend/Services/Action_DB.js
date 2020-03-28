const db = require('../models')

async function InitializeActions(){
  db.action.create({action_id: 1, description:'Register'})
  db.action.create({action_id: 2, description: "Login"})
  db.action.create({action_id: 3, description: "Logout"})
  db.action.create({action_id: 4, description: "Borrow Book"})
  db.action.create({action_id: 5, description: "Edit Book Instance"})
  db.action.create({action_id: 6, description: 'Delete Book Instance'})
  db.action.create({action_id: 7, description: 'Add Book'})
  db.action.create({action_id: 8, description: 'Edit Book'})
  db.action.create({action_id: 9, description: "Delete Book"})
  db.action.create({action_id: 10,description: "Review Book"})
  db.action.create({action_id: 11,description: 'Add Book Instance'})
}

module.exports = {
  InitializeActions
}