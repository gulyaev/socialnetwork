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
            <Login login={this.login} isFetching={this.props.isFetching} errorMessage={this.props.errorMessage}/>
        )   
    }
}

let mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        errorMessage: state.auth.errorMessage
    }
}

export default connect(mapStateToProps, {login})(LoginContainer)