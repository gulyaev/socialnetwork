import React, { useState } from "react"
import Input from "../input/Input"
import { NavLink } from "react-router-dom"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 18,
        color: "#fff"
      }}
      spin
    />
  );

const Registration = (props) => {
    const [email, setEmail] = useState("")
    const [nikname, setNikname] = useState("")
    const [password, setPassword] = useState("")

    let register = (email, nikname, password) => {
        props.register(email, nikname, password)
        setEmail("")
        setNikname("")
        setPassword("")
    }

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
            <div className="form__button" onClick={()=>{register(email, nikname, password)}} style={props.isFetching ? {pointerEvents: "none", opacity: "0.8"} : {}}>
            <span style={{margin: "0 10px 0 0"}}>Создать аккаунт</span>
            {props.isFetching && <Spin indicator={antIcon} />}    
            </div>
            <div className="form__registration"><NavLink to="/login">Авторизация</NavLink></div>
            {/* <div className="form__or">
                <div className="form__section_or">
                    <span>или</span>
                </div>
            </div> */}
        </div>
    )
}

export default Registration