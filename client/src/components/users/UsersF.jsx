import React, {useEffect} from "react"
import { NavLink } from "react-router-dom"
import axios from "axios"

const UsersF = (props) => {
    const usersSidebarData = props.usersSidebarData.usersSidebarData

    useEffect(()=>{
        debugger
        axios.get('http://localhost:5000/api/user1').then(res => {
            props.setSidebarUsers(res.data)
        })
    }, [])
debugger
        return (
            <div className="sidebar__flex users">
                <div className="users__header">
                    <div className="users__title"><h4>Пользователи</h4></div>
                    <div className="users__all"><NavLink to="/users">все</NavLink></div>
                </div>
                <div className="users__items">
                    {
                        props.usersSidebarData.usersSidebarData.map((user) => {
                            return (<div className="users__item">
                                <div className="users__image">
                                    <img src={require('../../img/logo.jpeg')} alt="ava" />
                                </div>
                                <div className="users__name">{user.nikname}</div>
                            </div>)
                        })
                    }
                </div>
            </div>
        )
}

export default UsersF