const mongoose = require('mongoose')
const dbURL = 'mongodb://localhost:27017/TodoList'
mongoose.connect(dbURL)

const db = mongoose.connection
const Todo = require('./todo')
// console.log(Todo)


db.on('error', (err) => {
  console.log('Error')
})

db.on('connected', (err) => {
  console.log('CONNECTED')
})
