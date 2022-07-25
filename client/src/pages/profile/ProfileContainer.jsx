import Profile from "./Profile";
import React from "react";
import { connect } from "react-redux";
import {
  setCurrentUserActionCreator,
  setToggleIsFetchingActionCreator,
  setFollowingInProgressActionCreator,
  updateStatusThunkCreator,
} from "../../redux/usersPageReducer";
import LoaderLarge from "../../components/LoaderLarge";
import axios from "axios";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { withMyRouter } from "../../hoc/withMyRouter";
import { compose } from "redux";
import { userApi } from "../../api/api";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.params.id;
    if (!userId) {
      userId = this.props.userId;
      // if (!userId) {
      //   debugger;
      // }
    }

    this.props.setIsFetching(true);
    axios.get(`http://localhost:5000/api/user/${userId}`).then((res) => {
      this.props.setIsFetching(false);
      this.props.setCurrentUser(res.data);
    });
  }

  updateStatus = (status) => {
    this.props.updateStatusThunkCreator(status);
  };

  follow = () => {
    const userId1 = this.props.params.id;
    const bodyParameters = {
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
    console.log("render");
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
          updateStatus={this.updateStatus}
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
    updateStatusThunkCreator: (status) =>
      dispatch(updateStatusThunkCreator(status)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withMyRouter,
  withAuthRedirect
)(ProfileContainer, "Войдите, чтобы посмотреть профиль");
