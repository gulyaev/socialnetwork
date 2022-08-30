import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";

class Users extends React.Component {
  componentDidMount() {
    this.props.setIsFetching(true);
    axios.get("http://localhost:5000/api/user").then((res) => {
      this.props.setIsFetching(false);
      this.props.setSidebarUsers(res.data);
    });
  }

  render = () => {
    return (
      <div className="sidebar__flex users">
        <div className="users__header">
          <div className="users__title">
            <h4>Пользователи</h4>
          </div>
          <div className="users__all">
            <NavLink to="/users">все</NavLink>
          </div>
        </div>
        <div className="users__items">
        {this.props.isFetching ? (
            <div className="userspage__loader">
            <Loader />
            </div>)
        :
          this.props.usersSidebarData.usersSidebarData.map((user) => {
            return (
              <div className="users__item">
                <div className="users__image">
                <NavLink to={"/profile/"+user.id}>
                  <img src={require("../../img/logo.jpeg")} alt="ava" />
                  </NavLink>
                </div>
                <NavLink to={"/profile/"+user.id}>
                <div className="users__name">{user.nikname}</div>
                </NavLink>
              </div>
            );
          })}
        </div>  
      </div>
    );
  };
}

export default Users;
