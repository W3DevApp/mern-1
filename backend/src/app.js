const express = require('express')
const cors = require('cors')
const app = express()

app.set('port', 'your_backend_port')

app.use(cors())

app.use(express.json())

app.use('/api/users', require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))

module.exports = app