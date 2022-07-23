import React from "react";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { addMessageActionCreator } from "../../redux/dialogsReducer";
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
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
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (messageData) => {
      dispatch(addMessageActionCreator(messageData));
    },
  };
};

let AuthRedirectComponentContainer = withAuthRedirect(
  DialogsContainer,
  "Войдите, чтобы посмотреть сообщения"
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRedirectComponentContainer);
