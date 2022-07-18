import { setCountUsersPerPageActionCreator, setCurrentPageActionCreator, setUsersActionCreator, setCurrentUserActionCreator, setToggleIsFetchingActionCreator } from "../../redux/usersPageReducer"
import { connect } from 'react-redux'
import UsersPage from "./UsersPage"

let mapStateToProps = (state) => {
    return {
        usersData: state.usersData,
        totalUsersCount: state.usersData.totalUsersCount,
        perPage: state.usersData.perPage,
        currentPage: state.usersData.currentPage,
        isFetching: state.usersData.isFetching
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (usersData, totalCount) => dispatch(setUsersActionCreator(usersData, totalCount)),
        setCurrentUser: (userData) => dispatch(setCurrentUserActionCreator(userData)),
        setCountUsersPerPage: (count) => dispatch(setCountUsersPerPageActionCreator(count)),
        setCurrentPage: (pageNumber) => dispatch(setCurrentPageActionCreator(pageNumber)),
        setIsFetching: (isFetching) => dispatch(setToggleIsFetchingActionCreator(isFetching))
    }
}

const UsersPageContainer = connect(mapStateToProps, mapDispatchToProps)(UsersPage)

export default UsersPageContainer