import React from "react"
import Login from "./Login"
import {connect} from "react-redux"
import { setLoginDataActionCreator, setToggleIsFetchingActionCreator } from "../../../redux/authReducer" 
import axios from "axios"



class LoginContainer extends React.Component {
    login = (email, password) => {
        this.props.toggleIsFetching(true)
            axios.post(`http://localhost:5000/api/login`, {
            email, 
            password
        }).then(res =>{
            this.props.login(res.data)
            localStorage.setItem("token", res.data.token)
            this.props.toggleIsFetching(false)
        })
    }

    render = () => {
        return (
            <Login login={this.login} isFetching={this.props.isFetching}/>
        )   
    }
}

let mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        login: (loginData) => {dispatch(setLoginDataActionCreator(loginData))},
        toggleIsFetching: (isFetching) => {dispatch(setToggleIsFetchingActionCreator(isFetching))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)