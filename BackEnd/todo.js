const {Schema , model} = require('mongoose');

const todoSchema = new Schema({
    title: String,
    isCompleted: Boolean
})

// model 

const Todo = model('todo' ,todoSchema)
module.exports = Todo