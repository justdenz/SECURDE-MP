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

db.sequelize.sync()
.then(console.log("DB has been initialized!"))
.catch(err => console.log(err))


//Functions
const {CreateAuthors} = require('./TestData/TestAuthor')
const {CreateBooks} = require('./TestData/TestBooks')
const {CreateAdmin} = require('./TestData/InitializeAdmin')

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

app.get("/", async (req, res) => {
    await CreateAdmin()
})


app.listen(PORT, function () {
    console.log('port ' + PORT + ' is live');
})
