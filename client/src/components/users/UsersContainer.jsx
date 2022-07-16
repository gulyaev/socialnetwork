import React from "react"
import Users from "./Users"
import { connect } from 'react-redux'
import { setUsersActionCreator } from "../../redux/usersReducer"

let mapStateToProps = (state) => {
    return {
        usersData: state.usersData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (users) => dispatch(setUsersActionCreator(users))
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer