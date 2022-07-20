import React from "react";
import UsersCard from "./UsersCard";
import { connect } from "react-redux";
import { logoutActionCreator } from "../../redux/authReducer";

class UsersCardContainer extends React.Component {
  logout = () => {
    this.props.logout();
  };

  render = () => {
    return <UsersCard nikname={this.props.nikname} logout={this.logout} />;
  };
}

let mapStateToProps = (state) => {
  return {
    nikname: state.auth.nikname,
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
