import React from 'react'

const Message = (props) => {
    return (
        <div className="messages__item">{props.message}</div>
    )
}

export default Message