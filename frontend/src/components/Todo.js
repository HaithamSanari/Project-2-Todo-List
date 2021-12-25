import React from 'react'

export default function Todo(props) {
// const { title, isCompleted, _id } = props.task
return (
    <div className = 'Todo'>
    <p>
        {/* you can say props.title ether way is correct*/}
        Title: {props.title}
    </p>
    <p>
        isCompleted: {props.isCompleted}
    </p>
    <p>
        ID : {props._id}
    </p>
    </div>
)
}
