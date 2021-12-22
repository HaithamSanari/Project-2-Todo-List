const mongoose = require('mongoose')
const dbURL = 'mongodb://localhost:27017/TodoList'
mongoose.connect(dbURL)

const db = mongoose.connection

// console.log(Todo)


db.on('error', (err) => {
  console.log('Error')
})

db.on('connected', (err) => {
  console.log('CONNECTED')
})
