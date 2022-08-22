import React, { Component } from "react";
import Settings from "./Settings";
import { connect } from "react-redux";
import { getAuth } from "../../redux/authSelectors";
import { initializeAppThunkCreator } from "../../redux/appReducer";

class SettingsContainer extends Component {
  render() {
    return (
      <Settings
        stateAuth={this.props.stateAuth}
        initializeApp={this.props.initializeApp}
        initialized={this.props.initialized}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateAuth: getAuth(state),
    initialized: state.app.initialized,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    initializeApp: () => {
      dispatch(initializeAppThunkCreator());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
