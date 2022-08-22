import React from "react";
import { NavLink } from "react-router-dom";
import { SettingFilled } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { API_URL } from "../../config";

const UsersCard = (props) => {
  const avatarLogo = <Avatar size={55} icon={<UserOutlined />} />;

  const avatar = props.authData.avatar ? (
    <img src={`${API_URL}` + `${props.authData.avatar}`} alt="avatar" />
  ) : (
    avatarLogo
  );

  return (
    <div className="sidebar__flex userscard">
      <div className="userscard__header">
        <NavLink to="/profile">
          {props.authData.isAuth ? (
            <div className="userscard__avatar">{avatar}</div>
          ) : (
            avatarLogo
          )}
        </NavLink>

        <div className="userscard__nik_container">
          <div className="userscard__nik_big">{props.authData.nikname}</div>
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
