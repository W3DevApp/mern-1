const mongoose = require('mongoose')

const URI = 'mongodb://your_mongodb_host/your_mongodb'

mongoose.connect(URI, {
  useNewUrlParser: true,
})

const connection = mongoose.connection

connection.once('open', () => {
  console.log('MongoDB is ready!')
})
