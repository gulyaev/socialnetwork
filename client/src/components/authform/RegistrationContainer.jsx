import React from "react"
import {connect} from "react-redux"
import { setRegisterDataActionCreator } from "../../redux/authReducer"
import { setToggleIsFetchingActionCreator } from "../../redux/usersPageReducer"
import Registration from "./Registration"
import axios from "axios"

class RegistrationContainer extends React.Component {
    register = (email, nikname, password) => {
        //this.props.setIsFetching(true)
        axios.post(`http://localhost:5000/api/register`, {
            email, 
            nikname,
            password
        }).then(res=>{
            //this.props.setIsFetching(false)
            this.props.register(res.data)
        })
    }

    render = () => {
        return (
            <Registration register={this.register}/>
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
        //setIsFetching: (isFetching) => dispatch(setToggleIsFetchingActionCreator(isFetching)),
        register: (registerData) => {dispatch(setRegisterDataActionCreator(registerData))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer)