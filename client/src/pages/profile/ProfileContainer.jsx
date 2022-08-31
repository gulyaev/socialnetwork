import Profile from "./Profile";
import React from "react";
import { connect } from "react-redux";
import {
  updateStatus,
  setCurrentUser,
  follow,
  unfollow,
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
    }
    this.props.setCurrentUser(userId);
  }

  updateStatus = (status) => {
    this.props.updateStatus(status);
  };

  follow = () => {
    let userId = this.props.params.id;
    this.props.follow(userId);
  };

  unfollow = () => {
    let userId = this.props.params.id;
    this.props.unfollow(userId);
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
            isFetching={this.props.isFetching}
            userId={this.props.userId}
            isAuth={this.props.isAuth}
            userId={this.props.stateAuth.usersId}
            followingInProgress={this.props.followingInProgress}
            params={this.props.params}
            follow={this.follow}
            unfollow={this.unfollow}
            stateAuth={this.props.stateAuth}
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
    stateAuth: state.auth,
    followingInProgress: state.usersData.followingInProgress,
  };
};

export default compose(
  connect(mapStateToProps, {
    setCurrentUser,
    updateStatus,
    follow,
    unfollow,
  }),
  withMyRouter,
  withAuthRedirect
)(ProfileContainer, "Войдите, чтобы посмотреть профиль");
