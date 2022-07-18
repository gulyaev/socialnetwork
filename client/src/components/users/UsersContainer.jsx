import React from "react"
import Users from "./Users"
import { connect } from 'react-redux'
import { setUsersActionCreator, setToggleIsFetchingActionCreator } from "../../redux/usersSidebarReducer"

let mapStateToProps = (state) => {
    return {
        usersSidebarData: state.usersSidebarData,
        isFetching: state.usersSidebarData.isFetching
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setSidebarUsers: (usersSidebarData) => dispatch(setUsersActionCreator(usersSidebarData)),
        setIsFetching: (isFetching) => dispatch(setToggleIsFetchingActionCreator(isFetching))
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer