import React from "react";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { addMessageActionCreator } from "../../redux/dialogsReducer";
import axios from "axios";

class DialogsContainer extends React.Component {
  render = () => {
    return (
      <Dialogs
        messageData={this.props.messageData}
        isAuth={this.props.isAuth}
      />
    );
  };
}

let mapStateToProps = (state) => {
  return {
    messageData: state.dialogsData.messageData,
    isAuth: state.auth.isAuth,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (messageData) => {
      dispatch(addMessageActionCreator(messageData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
