import React from 'react'

export default function Todo(props) {
const { title, isCompleted, _id } = props.task
return (
    <div className = 'Todo'>
    <p>
        {/* you can say props.title ether way is correct*/}
        Title: {title}
    </p>
    </div>
)
}
