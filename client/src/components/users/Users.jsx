import React from "react"
import axios from "axios"

class Users extends React.Component {
    componentDidMount() {
        axios.get('http://localhost:5000/api/user').then(res => {
            this.props.setUsers(res.data)
        })
    }

    render = () => {
        return (
            <div className="sidebar__flex users">
                <div className="users__header">
                    <div className="users__title"><h4>Пользователи</h4></div>
                    <div className="users__all">все</div>
                </div>
                <div className="users__items">
                    {
                        this.props.usersData.usersData.map((user) => {
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
}

export default Users