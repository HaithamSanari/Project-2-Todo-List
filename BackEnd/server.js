const express = require('express')
const app = express()
const db = require('./db')
const Todo = require('./todo')

app.use(express.json())
app.listen(4000, () => {
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
// ! we can use /filter/: if we want to
// ! ex: filter?isCompleted=false  ||  ?key=value&key=value
app.get('/filter', (req, res) => {
  // console.log(req.query);
  Todo.find({ isCompleted: req.query.isCompleted }, (err, data) => {
    if (err) {
      console.log('Error: ', err)
    } else {
      res.json(data)
    }
  })
  // res.json('server is working')
})
/* 
!to represent data in a way the not repeated 
!we use filter to make sure that we solve in the best way possible
app.get('/notComplete', (req, res) => {
  Todo.find({isCompleted : 'false'}, (err, data) => {
    if (err) {
      console.log('Error: ', err)
    } else {
      res.json(data)
    }
  })
  // res.json('server is working')
})
*/
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

app.put('/updateTasks/:id', (req, res) => {
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

// !    /updateValue/:id/:isCompleted // we can use both ways 
app.put('/updateValue/:id', (req, res) => {
  Todo.updateOne(
    { _id: req.params.id },
    //! WE can use {isCompleted : req.params.isCompleted} 
    { isCompleted: req.body.newValue },
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

app.delete('/deleteAllTasks', (req, res) => {
  Todo.deleteMany({ isCompleted: true }, (err, deleteObj) => {
    if (err) {
      console.log('Error', err)
      res.status(400).json('there was an error deleting')
    } else {
      console.log(deleteObj)
      {
        deleteObj.deletedCount === 0
          ? res.status(404).json('there is no task deleted')
          : res.status(200).json('All tasks deleted successfully')
      }
    }
  })
})
