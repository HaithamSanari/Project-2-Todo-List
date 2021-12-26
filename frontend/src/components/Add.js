import React,{useState} from 'react'

export default function Add(props) {
    const [newTitle, setNewTitle] = useState('')
    const createNewTitle = () =>{
        console.log("Add");
        // {"title":"task 5","isCompleted": false}
        props.createFunc({title: newTitle, isCompleted:false});
    }
    return (
        <div className = 'Add'>
        <input type="text" placeholder = 'Write new title here ...' 
        onChange ={(e) => {
        setNewTitle(e.target.value)  
        }} />
        <button onClick={createNewTitle}>Create New Todo</button>
        </div>
    )
}
