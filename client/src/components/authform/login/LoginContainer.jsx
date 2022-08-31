import React from "react"
import Login from "./Login"
import {connect} from "react-redux"
import { login } from "../../../redux/authReducer" 

class LoginContainer extends React.Component {
    login = (email, password) => {
        this.props.login(email, password)
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

export default connect(mapStateToProps, {login})(LoginContainer)