import React, { useState } from "react";
import Loader from "../Loader";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  render = () => {
    if (this.props.isFetching) {
      return (
        <div className="userspage__loader">
          <Loader />
        </div>
      );
    } else {
      if (this.state.editMode) {
        return (
          <input
            type="text"
            value={this.state.status}
            autoFocus={true}
            onBlur={this.deactivateEditMode}
            onChange={this.onStatusChange}
          />
        );
      } else if (!this.state.editMode) {
        return (
          <div onClick={this.activateEditMode} className="profile__status">
            {this.props.status || "ваш статус"}
          </div>
        );
      }
    }
  };
}

export default ProfileStatus;
