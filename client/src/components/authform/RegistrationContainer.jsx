import React from "react"
import {connect} from "react-redux"
import { register } from "../../redux/authReducer"
import Registration from "./Registration"

class RegistrationContainer extends React.Component {
    register = (email, nikname, password) => {
        this.props.register(email, nikname, password)
    }

    render = () => {
        return (
            <Registration register={this.register} isFetching={this.props.isFetching} errorMessage={this.props.errorMessage}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        errorMessage: state.auth.errorMessage
    }
}

export default connect(mapStateToProps, {register})(RegistrationContainer)