const express = require('express')
const app = express()
const db = require('./db')
const Todo = require('./todo')

app.use(express.json())
app.listen(3000, () => {
  console.log('server listening on')
  
})

app.get('/tasks', (req, res) => {
  Todo.find({}, (err, data) => {
    if (err) {
      console.log('Error: ', err)
    } else {
      res.json(data)
    }
  })
  // res.json('server is working')
})

app.post('/tasks', (req, res) => {
  console.log("23:" , req.body)
  Todo.create(req.body, (err, data) => {
    if (err) {
      console.log('Error: ', err)
    } else {
      res.status(201).json(data)
    }
  })
  // res.json('server is working')
})
