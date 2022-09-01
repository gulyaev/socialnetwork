import React, { useState } from "react"
import Input from "../../input/Input"
import { NavLink } from 'react-router-dom'
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

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [errorMesageState, setErrorMesageState] = useState(props.errorMessage);

    let login = (email, password) => {
        if (email === "") {
            setError("Введите email")
            return
        }
        if (password === "") {
            setError("Введите пароль")
            return
        }
        props.login(email, password)
        setEmail("")
        setPassword("")
        setError("")
        setErrorMesageState(props.errorMessage)
    }

    return (
        <div className="form__flex make__flex">
            <div className="form__header">Авторизация</div>
            <div className="form__login">
                <Input type="text" placeholder='email' value={email} setValue={setEmail} setErrorMesageState={setErrorMesageState}/>
            </div>
            <div className="form__password">
                <Input type="text" placeholder='password' value={password} setValue={setPassword} setErrorMesageState={setErrorMesageState}/>
            </div>
            <div className="form__forget"><NavLink to="/forgottenpassword">Забыли пароль?</NavLink></div>

            <div className="form__button" onClick={()=>{login(email, password)}} style={props.isFetching ? {pointerEvents: "none", opacity: "0.8"} : {}}>
                <span style={{margin: "0 10px 0 0"}}>Войти</span>
                {props.isFetching && <Spin indicator={antIcon} />}    
            </div>
            {errorMesageState && <span style={{fontSize: "12px", fontWeight:"bold", color:"red"}}>{props.errorMessage}</span>}
            {error!==null && <span style={{fontSize: "12px", fontWeight:"bold", color:"red"}}>{error}</span>}
            <div className="form__registration"><NavLink to="/registration">Регистрация</NavLink></div>
            {/* <div className="form__or">
                <div className="form__section_or">
                    <span>или</span>
                </div>
            </div> */}
        </div>
    )
}

export default Login