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
// const {GetUser} = require('./Services/User_DB.js')
const {ValidateLogin, ValidateCreateUser} = require('./Services/User_Service.js')

//Initializes session in a cookie
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000 * 24 //24 hours
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});


//Routes
app.use('/dashboard', require('./routes/dashboard.js'));
app.use('/admin', require('./routes/admin.js'));

app.get("/", async (req, res) => {
})

app.get("/login", (req, res) => {
    res.send("put login page here")
})

app.post("/validate_login", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const result = await ValidateLogin(username, password)
    
    if (result.status == "OK"){
        req.session.user = result.payload
    }

    console.log(req.session.user)
    res.send({
        status: result.status,
        payload: result.payload
    })
})

app.get("/signup", (req, res) => {
    var last_name = req.session.lastname
    var first_name = req.session.first_name
    var username = req.session.username
    var password = req.session.password
    var email = req.session.email
    var security_question = req.session.securityquestion
    var security_answer = req.session.securityanswer

    User.createUser(last_name, first_name, username, password, email, security_question, security_answer)
    .then((user) => {
        res.send("1")
        req.session.user = user
    })
    .catch(err => {
        res.send(err)
    })
})


app.listen(PORT, function () {
    console.log('port ' + PORT + ' is live');
})
