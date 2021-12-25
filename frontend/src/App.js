import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Todo from './components/Todo'
import './App.css'
function App() {
  const [tasks, setTasks] = useState([])
  const getData = () => {
    axios
      .get('http://localhost:4000/tasks')
      .then((response) => {
        // console.log('response', response)
        console.log('Data', response.data)
        setTasks(response.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }
  const deleteTasks = () => {
    axios
      .get('localhost:4000/deleteAllTasks')
      .then((response) => {
        // console.log('response', response)
        console.log('Data', response.data)
        setTasks(response.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  // ! you can say title = {taskObj.title}
  const mapOverTasks = tasks.map((taskObj, i) => (
      <Todo key={i} title={taskObj.title} isCompleted = {taskObj.isCompleted} _id = {taskObj._id}/>
    // task={taskObj._id} isCompleted={taskObj.isCompleted}
  ))
  /* {data.map(({body , completed , url , title} ,i)=>(
      <Todo key={i} title={title} body={body} completed={completed} url={url} />
      ))}
      */
  return (
    <div className='App'>
      <p>app</p>
      <button onClick={deleteTasks}>Delete TASKS</button>
      {mapOverTasks}
      {/* {tasks.map(({_id , title , isCompleted}, i)=>(
        <Todo key={i} title={title} _id={_id} isCompleted={isCompleted}/>
      ))} */}
    </div>
  )
}

export default App
