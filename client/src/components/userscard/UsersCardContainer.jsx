import React from "react";
import UsersCard from "./UsersCard";
import { connect } from "react-redux";

class UsersCardContainer extends React.Component {
  render = () => {
    return <UsersCard nikname={this.props.nikname} />;
  };
}

let mapStateToProps = (state) => {
  return {
    nikname: state.auth.nikname,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersCardContainer);
