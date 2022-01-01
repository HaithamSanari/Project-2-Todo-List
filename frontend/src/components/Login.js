import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Login(props) {
  const [email, setEmail] = useState('Sanari@gmail.com')
  const [password, setPassword] = useState('5678')

  const registerFunc = (e) => {
    e.preventDefault()
    // console.log("object")

    const newUser = {
      email,
      password,
    }
    axios
      .post(`http://localhost:4000/users/login`, newUser)
      .then((response) => {
        console.log('DATA: ', response.data)
        console.log('Login Successfully')
        props.setIsLoggedIn(true)
        props.setUsername(response.data.username)
      })
      .catch((err) => {
        console.log('ERR: ', err)
      })
  }
  return (
    <div className='Login'>
      <form action=''>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          placeholder='Enter your email address'
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          value={email}
        />
        <br />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          placeholder='Enter your password'
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          value={password}
        />
        <br />
        <input type='submit' value='Login' onClick={registerFunc} className = 'btn btn-primary' />
        <br />
        <Link to='/register'>Don't Have Account</Link>
      </form>
    </div>
  )
}
