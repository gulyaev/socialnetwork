import React from "react"
import {connect} from "react-redux"
import { setRegisterDataActionCreator, setToggleIsFetchingActionCreator } from "../../redux/authReducer"
import Registration from "./Registration"
import axios from "axios"

class RegistrationContainer extends React.Component {
    register = (email, nikname, password) => {
        this.props.setIsFetching(true)
        axios.post(`http://localhost:5000/api/register`, {
            email, 
            nikname,
            password
        }).then(res=>{
            this.props.register(res.data)
            this.props.setIsFetching(false)
        })
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

let mapDispatchToProps = (dispatch) => {
    return {
        setIsFetching: (isFetching) => dispatch(setToggleIsFetchingActionCreator(isFetching)),
        register: (registerData) => {dispatch(setRegisterDataActionCreator(registerData))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer)