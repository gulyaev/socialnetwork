import React from "react";
import { NavLink } from "react-router-dom";
import { SettingFilled } from "@ant-design/icons";

const UsersCard = (props) => {
  debugger;
  return (
    <div className="sidebar__flex userscard">
      <div className="userscard__header">
        <div className="userscard__avatar">
          <img src={require("../../img/logo.jpeg")} width="48px" alt="" />
        </div>
        <div className="userscard__nik_container">
          <div className="userscard__nik_big">{props.nikname}</div>
          <div
            className="userscard__logout"
            onClick={() => {
              props.logout();
            }}
          >
            Выйти
          </div>
        </div>
        <div className="userscard__settings">
          <NavLink to="/settings">
            <SettingFilled style={{ fontSize: "16px", color: "#757575" }} />
          </NavLink>
        </div>
      </div>

      <div className="userscard__items">
        <div className="userscard__item">
          <div className="userscard__char">78</div>
          <div className="userscard__ranking">рейтинг</div>
        </div>
        <div className="userscard__item">
          <div className="userscard__char">4</div>
          <div className="userscard__ranking">подписчика</div>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
