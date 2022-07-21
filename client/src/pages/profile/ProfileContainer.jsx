import Profile from "./Profile";
import React from "react";
import { connect } from "react-redux";
import {
  setCurrentUserActionCreator,
  setToggleIsFetchingActionCreator,
} from "../../redux/usersPageReducer";
import LoaderLarge from "../../components/LoaderLarge";
import { useParams } from "react-router-dom";
import axios from "axios";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.params.id;
    // if (!userId) {
    //   userId = this.props.userId;
    // }
    this.props.setIsFetching(true);
    axios.get(`http://localhost:5000/api/user/${userId}`).then((res) => {
      this.props.setIsFetching(false);
      console.log(res.data);
      this.props.setCurrentUser(res.data);
    });
  }

  follow = () => {
    const userId1 = this.props.params.id;
    const bodyParameters = {
      //id: 35,
      id: userId1,
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(`http://localhost:5000/api/follow`, bodyParameters, config)
      .then((res) => {
        console.log(res.data);
      });
  };

  unfollow = () => {
    const userId1 = this.props.params.id;
    const bodyParameters = {
      //id: 34,
      id: userId1,
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .put(`http://localhost:5000/api/unfollow`, bodyParameters, config)
      .then((res) => {
        console.log(res.data);
      });
  };

  render = () => {
    return (
      <>
        {this.props.isFetching ? (
          <div className="userspage__loader">
            <LoaderLarge />
          </div>
        ) : null}
        <Profile
          currentUser={this.props.currentUser}
          follow={this.follow}
          unfollow={this.unfollow}
        />
      </>
    );
  };
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

let mapStateToProps = (state) => {
  return {
    currentUser: state.usersData.currentUser,
    isFetching: state.usersData.isFetching,
    userId: state.auth.usersId,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (userData) =>
      dispatch(setCurrentUserActionCreator(userData)),
    setIsFetching: (isFetching) =>
      dispatch(setToggleIsFetchingActionCreator(isFetching)),
  };
};

let WithURLDataContainerComponent = withRouter(ProfileContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithURLDataContainerComponent);
