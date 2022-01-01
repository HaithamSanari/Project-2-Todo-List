import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Todo from './components/Todo'
import Add from './components/Add'
import Register from './components/Register'
import Login from './components/Login'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
function App() {
  const [tasks, setTasks] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
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

  const logoutFunc = () => {
    setIsLoggedIn(false)
    setUsername('')
  }
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
      <p>Name: {username}</p>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Todos
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
        </nav>
      <br />
      <button onClick={logoutFunc} className='btn-danger'>
        Logout
      </button>
      <Routes>
        <Route
          path='/home'
          element={
            <div>
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
              <Add createFunc={addData} />
              {mapOverTasks}
            </div>
          }
        />
        <Route
          path='login'
          element={
            <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
          }
        />
        <Route path='register' element={<Register />} />
      </Routes>

      <div>
        {/* {isLoginPage ? (
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
      )} */}
      </div>
    </div>
  )
}

export default App
