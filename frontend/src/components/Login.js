import React,{useState} from 'react'
import axios from 'axios'

export default function Login(props) {
    const [email, setEmail] = useState('Sanari@gmail.com')
    const [password, setPassword] = useState('5678')
    const [validate, setvalidate] = useState('')
    const registerFunc = ((e)=>{
        e.preventDefault()
        // console.log("object")
        if (
            email === props.email &&
            password === props.password
            ) {
                // اذا كانت صحيحة يجب تغيير validation = true
            setvalidate(true)
            } else {
                // اذا كانت خاطئة يجب تغيير validation = false
            setvalidate(false)
            }
        
        const newUser ={
            email,
            password
        }
        axios
        .post(`http://localhost:4000/users/login`, newUser)
        .then((response) => {
        console.log("DATA: ", response.data);
        console.log("successfully enter")
        })
        .catch((err) => {
        console.log("ERR: ", err);
        });
    })
    return (
        <div className = "Login">
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
            </form>
            <input type="submit" value="Login" onClick={registerFunc}/>
            {validate === true  && (
        <p style={{ color: 'green' }}>Correct Credentials</p>
    )}

    {validate === false && (<p style={{ color: 'red' }}>Wrong Credentials</p>)}
        </div>
    )
}
