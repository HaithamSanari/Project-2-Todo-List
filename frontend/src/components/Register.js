import React,{useState} from 'react'
import axios from 'axios'
export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const registerFunc = ((e)=>{
        e.preventDefault()
        // console.log("object")
        const newUser ={
            email,
            password,
            username
        }
        axios
        .post(`http://localhost:4000/users/register`, newUser)
        .then((response) => {
        console.log("DATA: ", response.data);
        
        })
        .catch((err) => {
        console.log("ERR: ", err);
        });
    })
    return (
        <div className = 'register'>
            <form action="">
            <label htmlFor="email">Email:</label>
            <input type="email" placeholder = "Enter your email address" onChange={(e) =>{
                setEmail(e.target.value)
            }}value = {email}/>
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder = "Enter your password" onChange={(e) =>{
                setPassword(e.target.value)
            }} value = {password}/>
            <br />
            <label htmlFor="username">Username:</label>
            <input type="text" placeholder = "Enter your username" onChange={(e) =>{
                setUsername(e.target.value)
            }}value = {username}/>
            <br />
            </form>
            <input type="submit" value="Register" onClick={registerFunc}/>
            
        </div>
    )
}
