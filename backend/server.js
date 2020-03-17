const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use('/admin', require('./routes/admin.js'));

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(PORT, function () {
    console.log('port ' + PORT + ' is live');
})
