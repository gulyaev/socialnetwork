import React, { useState } from "react";

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
    return (
      <>
        {this.state.editMode && (
          <input
            type="text"
            value={this.state.status}
            autoFocus={true}
            onBlur={this.deactivateEditMode}
            onChange={this.onStatusChange}
          />
        )}
        {!this.state.editMode && (
          <div onClick={this.activateEditMode} className="profile__status">
            {this.props.status || "ваш статус"}
          </div>
        )}
      </>
    );
  };
}

export default ProfileStatus;
