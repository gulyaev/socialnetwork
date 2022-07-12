import React from 'react'
import { NavLink } from 'react-router-dom'

const DialogItem = (props) => {
    return (
        <NavLink to={"/dialogs/" + props.id} >{props.name}</NavLink>
    )
}

export default DialogItem