const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')
const db = require('./models')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())

//Functions
const {CreateAuthors} = require('./TestData/TestAuthor')
const {CreateBooks} = require('./TestData/TestBooks')
const {ValidateCreateAdmin} = require('./Services/Admin_Service')
const config = require('./config/config')

db.sequelize.sync()
.then(async () => {
    console.log("DB has been initialized!")
    await ValidateCreateAdmin(config.admin.admin_username, config.admin.admin_password)
    /*Initialize Action DB*/
    db.action.create({action_id: 1, description: "Register"})
    .then()
    .catch(err => {})
    db.action.create({action_id: 2, description: "Login"})
    .then()
    .catch(err => {})
    db.action.create({action_id: 3, description: "Logout"})
    .then()
    .catch(err => {})
    db.action.create({action_id: 4, description: "Borrow Book"})
    .then()
    .catch(err => {})
    db.action.create({action_id: 5, description: "Edit Book Instance"})
    .then()
    .catch(err => {})
    db.action.create({action_id: 6, description: 'Delete Book Instance'})
    .then()
    .catch(err => {})
    db.action.create({action_id: 7, description: 'Add Book'})
    .then()
    .catch(err => {})
    db.action.create({action_id: 8, description: 'Edit Book'})
    .then()
    .catch(err => {})
    db.action.create({action_id: 9, description: "Delete Book"})
    .then()
    .catch(err => {})
    db.action.create({action_id: 10,description: "Review Book"})
    .then()
    .catch(err => {})
    db.action.create({action_id: 11,description: 'Add Book Instance'})
    .then()
    .catch(err => {})
    db.action.create({action_id: 12,description: "Add Author"})
    .then()
    .catch(err => {})
    db.action.create({action_id: 13,description: "Delete Author"})
    .then()
    .catch(err=>console.log)
    db.action.create({action_id: 14,description:"Edit Author"})
    .then()
    .catch(err => {})
    db.action.create({action_id: 15,description:"User Change Password"})
    .then()
    .catch(err => {})
    db.action.create({action_id: 16,description:"Admin Change Password"})
    .then()
    .catch(err => {})
    db.action.create({action_id: 17,description:"Login as admin"})
    .then()
    .catch(err => {})

    db.author.create({author_id: 1, first_name: "Rick", last_name: "Riordan"})
    .then()
    .catch(err=>console.log)
    db.author.create({author_id: 2, first_name: "Jennifer", last_name: "Niven"})
    .then()
    .catch(err=>console.log)
    db.author.create({author_id: 3, first_name: "Jenny", last_name: "Han"})
    .then()
    .catch(err=>console.log)
    

})
.catch(err => console.log(err))




//Initializes session in a cookie
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: true,
    saveUninitialized: true,
    cookie: {
        // maxAge: 60 * 60 * 1000 * 24 //24 hours
        maxAge: 5000 //5 seconds
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');       
    }
    next();
});


//Routes
app.use('/user', require('./routes/user.js'));
app.use('/admin', require('./routes/admin.js'));
app.use('/book', require('./routes/book.js'));
app.use('/author', require('./routes/author.js'));
app.use('/review', require('./routes/review.js'));

app.get("/", (req, res) => {
})


app.listen(PORT, function () {
    console.log('port ' + PORT + ' is live');
})
