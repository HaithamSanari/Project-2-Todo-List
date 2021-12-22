const express = require('express')
const app = express()
const db = require('./db')

app.listen(3000, () => {
  console.log('server listening on')
  console.log('server listening off')
})

app.get('/', (req, res) => {
  // if (err) {
  //   return handleError(err)
  // }
  console.log('===================')
  console.log('Data')
  res.json("GET =================================")
})
// res.json(arr)  ;
// res.json(User)  ;
