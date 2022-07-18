import { setCountUsersPerPageActionCreator, setCurrentPageActionCreator, setUsersActionCreator } from "../../redux/usersPageReducer"
import { connect } from 'react-redux'
import UsersPage from "./UsersPage"

let mapStateToProps = (state) => {
    debugger
    return {
        usersData: state.usersData,
        totalUsersCount: state.usersData.totalUsersCount,
        perPage: state.usersData.perPage,
        currentPage: state.usersData.currentPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (usersData, totalCount) => dispatch(setUsersActionCreator(usersData, totalCount)),
        setCountUsersPerPage: (count) => dispatch(setCountUsersPerPageActionCreator(count)),
        setCurrentPage: (pageNumber) => dispatch(setCurrentPageActionCreator(pageNumber))
    }
}

const UsersPageContainer = connect(mapStateToProps, mapDispatchToProps)(UsersPage)

export default UsersPageContainer