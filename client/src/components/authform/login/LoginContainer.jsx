import React from "react"
import Login from "./Login"
import {connect} from "react-redux"
import { setLoginDataActionCreator } from "../../../redux/authReducer" 
import axios from "axios"

class LoginContainer extends React.Component {
    login = (email, password) => {
        axios.post(`http://localhost:5000/api/login`, {
            email, 
            password
        }).then(res =>{
            this.props.login(res.data)
            localStorage.setItem("token", res.data.token)
        })
    }

    render = () => {
        return (
            <Login login={this.login} />
        )   
    }
}

let mapStateToProps = (state) => {
    return {
        isFetching: state.usersData.isFetching
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        login: (loginData) => {dispatch(setLoginDataActionCreator(loginData))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)