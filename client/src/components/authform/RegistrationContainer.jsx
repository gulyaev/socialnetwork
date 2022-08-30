import React from "react"
import {connect} from "react-redux"
import { register } from "../../redux/authReducer"
import Registration from "./Registration"
import axios from "axios"

class RegistrationContainer extends React.Component {
    register = (email, nikname, password) => {
        this.props.register(email, nikname, password)
        window.location.replace("/login");
    }

    render = () => {
        return (
            <Registration register={this.register} isFetching={this.props.isFetching}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching
    }
}

export default connect(mapStateToProps, {register})(RegistrationContainer)