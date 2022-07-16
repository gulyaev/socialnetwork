import React, { useState } from "react"
import Input from "../input/Input"
import { NavLink } from "react-router-dom"

const Registration = () => {
    const [email, setEmail] = useState("")
    const [nikname, setNikname] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="form__flex make__flex">
            <div className="form__header">Регистрация</div>
            <div className="form__login">
                <Input type="text" placeholder='E-mail' value={email} setValue={setEmail} />
            </div>
            <div className="form__nikname">
                <Input type="text" placeholder='Никнейм' value={nikname} setValue={setNikname} />
            </div>
            <div className="form__password">
                <Input type="text" placeholder='Пароль' value={password} setValue={setPassword} />
            </div>
            <div className="form__button">Создать аккаунт</div>
            <div className="form__registration"><NavLink to="/login">Авторизация</NavLink></div>
            <div className="form__or">
                <div className="form__section_or">
                    <span>или</span>
                </div>
            </div>
        </div>
    )
}

export default Registration