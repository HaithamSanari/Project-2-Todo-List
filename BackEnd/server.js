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
  console.log('23:', req.body)
  Todo.create(req.body, (err, data) => {
    if (err) {
      console.log('Error: ', err)
    } else {
      res.status(201).json(data)
    }
  })
  // res.json('server is working')
})

app.put('/Tasks/:oldTitle', (req, res) => {
  Todo.updateOne(
    { title: req.params.oldTitle },
    { title: req.body.newTitle },
    (err, updateObj) => {
      if (err) {
        console.log('Error', err)
        res.status(400).json('there was an error updateOne')
      } else {
        console.log(updateObj)

        if (updateObj.modifiedCount === 0) {
          console.log('Error', err)
          res.status(404).json('User Not Found')
        } else {
          console.log('===================')
          // console.log("Created new user successfully" ,newData);
          res
            .status(200)
            .json(
              'Success UpdateOne From' +
                req.params.oldTitle +
                ' to ' +
                req.body.newTitle
            )
        }
      }
    }
  )
})

app.put('/tasks/:id', (req, res) => {
  Todo.updateOne(
    { _id: req.params.id },
    { title: req.body.newTitle },
    (err, updateObj) => {
      if (err) {
        console.log('Error', err)
        res.status(400).json('there was an error updateOne')
      } else {
        console.log(updateObj)

        {
          updateObj.modifiedCount === 1
            ? res.status(200).json('Success updateOne User')
            : res.status(404).json('User Not Found')
        }
        // if (updateObj.matchedCount === 0) {
        //   console.log('Error', err)
        //   res.status(404).json('User Not Found')
        // } else {
        //   console.log('===================')
        //   // console.log("Created new user successfully" ,newData);
        //   res
        //     .status(200)
        //     .json(
        //       'Success updateOne ' +
        //         req.params.id +
        //         ' to ' +
        //         req.body.newTitle
        //     )
        // }
      }
    }
  )
})

app.delete('/tasks/:title', (req, res) => {
  Todo.deleteOne({ title: req.params.title }, (err, deleteObj) => {
    if (err) {
      console.log('Error', err)
      res.status(400).json('there was an error deleting')
    } else {
      console.log(deleteObj)

      if (deleteObj.deletedCount === 0) {
        console.log('Error', err)
        res.status(404).json('User Not Found')
      } else {
        console.log('===================')
        // console.log("Created new user successfully" ,newData);
        res.status(200).json('Success Delete ' + req.params.title)
      }
    }
  })
})
app.delete('/deleteTasks/:id', (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err, deleteObj) => {
    if (err) {
      console.log('Error', err)
      res.status(400).json('there was an error deleting')
    } else {
      console.log(deleteObj)
      {
        deleteObj.deletedCount === 1
          ? res.status(200).json('Success Delete ' + req.params.id)
          : res.status(404).json('User Not Found')
      }
      // if (deleteObj.deletedCount === 0) {
      //   console.log('Error', err)
      //   res.status(404).json('User Not Found')
      // } else {
      //   console.log('===================')
      //   // console.log("Created new user successfully" ,newData);
      //   res.status(200).json('Success Delete ' + req.params.id)
      // }
    }
  })
})
