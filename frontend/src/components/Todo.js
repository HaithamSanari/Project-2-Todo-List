import React from 'react'

export default function Todo(props) {
const { title, isCompleted, _id } = props.task
return (
    <div className = 'Todo'>
    {/* <input type="checkbox" checked={isCompleted} /> */}
                                {/* you can say props.title ether way is correct*/}
    <input  type="checkbox" defaultChecked={isCompleted} onClick={()=>{
    props.toggleTodo(_id,!isCompleted)
    }}/>
    <span  style={{ textDecoration:isCompleted?'line-through':"none" }}>{title}</span>
    <button className = 'btn-secondary' onClick={() => {
        props.deleteTodo(_id)
    }}>X</button>
    </div>
)
}
