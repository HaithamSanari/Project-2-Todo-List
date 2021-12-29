import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Todo from './components/Todo'
import Add from './components/Add'
import Register from './components/Register'
import Login from './components/Login'
import './App.css'
function App() {
  const [tasks, setTasks] = useState([])
  const [isLoginPage, setIsLoginPage] = useState(true)
  // const [addTasks, setAddTasks] = useState([])
  // const [deleteTasks, setDeleteTasks] = useState([])
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
  const filterData = (status) => {
    axios
      .get(`http://localhost:4000/filter?isCompleted=${status}`)
      .then((response) => {
        // console.log('response', response)
        console.log('Data', response.data)
        setTasks(response.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }
  // const deleteTasks= () => {
  //   // console.log('deleteData')

  //   axios
  //     .delete('http://localhost:4000/deleteAllTasks')
  //     .then((response) => {
  //       // console.log('response', response)
  //       console.log('Data', response.data)
  //       // setDeleteTasks(response.data)
  //       getData()
  //     })
  //     .catch((err) => {
  //       console.log('error', err)
  //     })
  // }

  const deleteTasks = () => {
    // console.log("object")
    axios
      .delete(`http://localhost:4000/deleteAllTasks`)
      //     (`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log('DATA: ', response.data)
        getData()
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log('ERR: ', err)
      })
  }
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:4000/deleteTasks/${id}`)
      //     (`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log('Data: ', response.data)
        getData()
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log('ERR: ', err)
      })
  }
  // const updateTodo = (id,newValue) => {
  //   axios
  //     .put(`http://localhost:4000/updateValue/${id}/${newValue}`)
  //     //     (`http://localhost:5000/tasks/${id}`)
  //     .then((response) => {
  //       // console.log('RESPONSE: ', response);
  //       console.log('Data: ', response.data)
  //       getData()
  //       // change react hooks state using spread operator
  //     })
  //     .catch((err) => {
  //       console.log('ERR: ', err)
  //     })
  // }

  const toggleTodo = (id, newValue) => {
    axios
      .put(`http://localhost:4000/updateValue/${id}/${newValue}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log('DATA: ', response.data)
        getData()
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log('ERR: ', err)
      })
  }
  // const Register = () => {
  //   axios
  //     .put(`http://localhost:4000/users/register`)
  //     .then((response) => {
  //       // console.log('RESPONSE: ', response);
  //       console.log("DATA: ", response.data);
  //       getData();
  //       // change react hooks state using spread operator
  //     })
  //     .catch((err) => {
  //       console.log("ERR: ", err);
  //     });
  // };

  const addData = (body) => {
    // console.log("new data");
    // {"title":"task 5","isCompleted": false}
    axios
      .post('http://localhost:4000/tasks', body)
      .then((response) => {
        // console.log('response', response)
        console.log('Data', response.data)
        // setAddTasks(response.data)
        getData()
        // change react hooks state using spread operator
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
    <Todo
      key={taskObj._id}
      task={taskObj}
      deleteTodo={deleteTodo}
      toggleTodo={toggleTodo}
    />
    // task={taskObj._id} isCompleted={taskObj.isCompleted}
  ))
  /* {data.map(({body , completed , url , title} ,i)=>(
      <Todo key={i} title={title} body={body} completed={completed} url={url} />
      ))}
      */
  return (
    <div className='App'>
      <p>app</p>
      <button onClick={getData}>GET DATA </button>
      <button onClick={deleteTasks}>DELETE Completed tasks </button>
      <button
        onClick={() => {
          filterData(true)
        }}
      >
        GET DONE{' '}
      </button>
      <button
        onClick={() => {
          filterData(false)
        }}
      >
        {' '}
        GET PENDING{' '}
      </button>
      {/* <Add createFunc={addData} /> */}
      {/* <button onClick={Register}>Register </button> */}
      {/* <Login/> */}
      {/* <Delete createFunc={deleteData}/> */}
      {/* {mapOverTasks} */}
      <Register/>
      {/* {tasks.map(({_id , title , isCompleted}, i)=>(
        <Todo key={i} title={title} _id={_id} isCompleted={isCompleted}/>
      ))} */}

      {isLoginPage ? (
        <>
          <Login />
          <button
            onClick={() => {
              setIsLoginPage(false)
            }}
          >
            Go to Register
          </button>
        </>
      ) : (
        <>
          <Register />
          <button
            onClick={() => {
              setIsLoginPage(true)
            }}
          >
            Go to Login
          </button>
        </>
      )}
    </div>
  )
}

export default App
