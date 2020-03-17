const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())

app.use('/', require('./routes/user.js'));
app.use('/guest', require('./routes/guest.js'));
app.use('/admin', require('./routes/admin.js'));


app.listen(PORT, function () {
    console.log('port ' + PORT + ' is live');
})
