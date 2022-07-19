import Profile from "./Profile"
import React from "react"
import {connect} from "react-redux"
import { setCurrentUserActionCreator, setToggleIsFetchingActionCreator } from "../../redux/usersPageReducer"
import LoaderBig from "../../components/LoaderBig"
import { useParams } from "react-router-dom";
import axios from "axios";

class ProfileContainer extends React.Component {
    componentDidMount() {
        const userId = this.props.params.id
        /*
        if (!userId) {
            userId = "id залогинненого пользователя";
        }
        */
        this.props.setIsFetching(true)
        axios.get(`http://localhost:5000/api/user/${userId}`).then(res => {
        this.props.setIsFetching(false)
            console.log(res.data)
            this.props.setCurrentUser(res.data)
        })
    }

    render = () => {
        return (<>
            {
                this.props.isFetching 
                ? 
                <div className="userspage__loader">
                <LoaderBig />
                </div>
                :
                null
                }
            <Profile currentUser = {this.props.currentUser} />
            </>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();
  
    return (
      <WrappedComponent
        {...props}
        params={params}
      />
    );
  };

let mapStateToProps = (state) => {
    return {
        currentUser: state.usersData.currentUser,
        isFetching: state.usersData.isFetching
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (userData) => dispatch(setCurrentUserActionCreator(userData)),
        setIsFetching: (isFetching) => dispatch(setToggleIsFetchingActionCreator(isFetching))
    }
}

let WithURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, mapDispatchToProps)(WithURLDataContainerComponent)