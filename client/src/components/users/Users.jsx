import React from "react"

const Users = (props) => {
    return (
        <div className="sidebar__flex users">
            <div className="users__header">
                <div className="users__title"><h4>Пользователи</h4></div>
                <div className="users__all">все</div>
            </div>
            <div className="users__items">
                <div className="users__item">
                    <div className="users__image">
                        <img src={require('../../img/logo.jpeg')} alt="ava" />
                    </div>
                    <div className="users__name">Никнейм</div>
                </div>
                <div className="users__item">
                    <div className="users__image">
                        <img src={require('../../img/logo.jpeg')} alt="ava" />
                    </div>
                    <div className="users__name">Никнейм</div>
                </div>
                <div className="users__item">
                    <div className="users__image">
                        <img src={require('../../img/logo.jpeg')} alt="ava" />
                    </div>
                    <div className="users__name">Никнейм</div>
                </div>
            </div>
        </div>
    )
}

export default Users