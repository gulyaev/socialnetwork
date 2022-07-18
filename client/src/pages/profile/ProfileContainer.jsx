import Profile from "./Profile"
import {connect} from "react-redux"
import { setCurrentUserActionCreator } from "../../redux/usersPageReducer"

let mapStateToProps = (state) => {
    return {
        currentUser: state.usersData.currentUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (userData) => dispatch(setCurrentUserActionCreator(userData)),
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ProfileContainer