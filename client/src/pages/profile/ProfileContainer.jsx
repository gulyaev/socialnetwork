import Profile from "./Profile"
import React from "react"
import {connect} from "react-redux"
import { setCurrentUserActionCreator } from "../../redux/usersPageReducer"
import { useParams } from "react-router-dom";
import axios from "axios";

class ProfileContainer extends React.Component {
    componentDidMount() {
        const userId = this.props.params.id
        // this.props.setIsFetching(true)
        axios.get(`http://localhost:5000/api/user/${userId}`).then(res => {
        //     this.props.setIsFetching(false)
            console.log(res.data)
            this.props.setCurrentUser(res.data)
        })
    }

    render = () => {
        return (
            <Profile currentUser = {this.props.currentUser} />
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        params={params}
        // etc...
      />
    );
  };

let mapStateToProps = (state) => {
    return {
        currentUser: state.usersData.currentUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (userData) => dispatch(setCurrentUserActionCreator(userData))
    }
}

let WithURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, mapDispatchToProps)(WithURLDataContainerComponent)