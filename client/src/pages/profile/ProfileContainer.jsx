import Profile from "./Profile";
import React from "react";
import { connect } from "react-redux";
import {
  setCurrentUserActionCreator,
  setToggleIsFetchingActionCreator,
  setFollowingInProgressActionCreator,
} from "../../redux/usersPageReducer";
import LoaderLarge from "../../components/LoaderLarge";
import axios from "axios";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { withRouter } from "../../hoc/withRouter";
import { compose } from "redux";

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
    this.props.setIsFollowing(true);
    axios
      .put(`http://localhost:5000/api/follow`, bodyParameters, config)
      .then((res) => {
        this.props.setIsFollowing(false);
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
    this.props.setIsFollowing(true);
    axios
      .put(`http://localhost:5000/api/unfollow`, bodyParameters, config)
      .then((res) => {
        this.props.setIsFollowing(false);
        console.log(res.data);
      });
  };

  render = () => {
    return (
      <>
        {/* {this.props.isFetching ? (
          <div className="userspage__loader">
            <LoaderLarge />
          </div>
        ) : null} */}
        <Profile
          currentUser={this.props.currentUser}
          follow={this.follow}
          unfollow={this.unfollow}
          followingInProgress={this.props.followingInProgress}
          isAuth={this.props.isAuth}
        />
      </>
    );
  };
}

let mapStateToProps = (state) => {
  return {
    currentUser: state.usersData.currentUser,
    isFetching: state.usersData.isFetching,
    userId: state.auth.usersId,
    followingInProgress: state.usersData.followingInProgress,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (userData) =>
      dispatch(setCurrentUserActionCreator(userData)),
    setIsFetching: (isFetching) =>
      dispatch(setToggleIsFetchingActionCreator(isFetching)),
    setIsFollowing: (isFollowing) =>
      dispatch(setFollowingInProgressActionCreator(isFollowing)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthRedirect
)(ProfileContainer, "Войдите, чтобы посмотреть профиль");
