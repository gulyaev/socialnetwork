import Profile from "./Profile";
import React from "react";
import { connect } from "react-redux";
import {
  updateStatusThunkCreator,
  setCurrentUserThunkCreator,
  followThunkCreator,
  unfollowThunkCreator,
} from "../../redux/usersPageReducer";
import LoaderLarge from "../../components/LoaderLarge";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { withMyRouter } from "../../hoc/withMyRouter";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.params.id;
    if (!userId) {
      userId = this.props.userId;
      // if (!userId) {
      //   debugger;
      // }
    }

    this.props.setCurrentUserThunkCreator(userId);
  }

  updateStatus = (status) => {
    this.props.updateStatusThunkCreator(status);
  };

  follow = () => {
    let userId = this.props.params.id;
    this.props.followThunkCreator(userId);
  };

  unfollow = () => {
    let userId = this.props.params.id;
    this.props.unfollowThunkCreator(userId);
  };

  render = () => {
    return (
      <>
        {this.props.isFetching ? (
          <div className="userspage__loader">
            <LoaderLarge />
          </div>
        ) : (
          <Profile
            currentUser={this.props.currentUser}
            follow={this.follow}
            unfollow={this.unfollow}
            followingInProgress={this.props.followingInProgress}
            isAuth={this.props.isAuth}
            isFetching={this.props.isFetching}
            updateStatus={this.updateStatus}
          />
        )}
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
    setCurrentUserThunkCreator: (userId) =>
      dispatch(setCurrentUserThunkCreator(userId)),
    updateStatusThunkCreator: (status) =>
      dispatch(updateStatusThunkCreator(status)),
    followThunkCreator: (userId) => dispatch(followThunkCreator(userId)),
    unfollowThunkCreator: (userId) => dispatch(unfollowThunkCreator(userId)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withMyRouter,
  withAuthRedirect
)(ProfileContainer, "Войдите, чтобы посмотреть профиль");
