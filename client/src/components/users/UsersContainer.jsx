import React from "react"
import Users from "./Users"
import { connect } from 'react-redux'
import { setUsersActionCreator } from "../../redux/usersSidebarReducer"

let mapStateToProps = (state) => {
    return {
        usersSidebarData: state.usersSidebarData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setSidebarUsers: (usersSidebarData) => dispatch(setUsersActionCreator(usersSidebarData))
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer