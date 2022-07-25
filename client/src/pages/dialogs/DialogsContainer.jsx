import React from "react";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { addMessageActionCreator } from "../../redux/dialogsReducer";
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import axios from "axios";
import { compose } from "redux";

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
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (messageData) => {
      dispatch(addMessageActionCreator(messageData));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(DialogsContainer, "Войдите, чтобы посмотреть сообщения");
