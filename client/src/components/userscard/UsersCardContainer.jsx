import React from "react";
import UsersCard from "./UsersCard";
import { connect } from "react-redux";
import { logoutActionCreator } from "../../redux/authReducer";

class UsersCardContainer extends React.Component {
  logout = () => {
    this.props.logout();
  };

  render = () => {
    return (
      <UsersCard
        nikname={this.props.nikname}
        isAuth={this.props.isAuth}
        currentUser={this.props.currentUser}
        logout={this.logout}
      />
    );
  };
}

let mapStateToProps = (state) => {
  return {
    nikname: state.auth.nikname,
    isAuth: state.auth.isAuth,
    currentUser: state.usersData.currentUser,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logoutActionCreator());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersCardContainer);
