import React, { useState } from "react";
import ProfileStatus from "./profilestatus/ProfileStatus";

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Button } from "antd";

import { Typography } from "antd";
const { Title } = Typography;

const ProfileInfo = (props) => {
  const [follow, setFollow] = useState(false);

  const menu = (
    <Menu
      onClick={() => unfollowHandler()}
      items={[
        {
          label: "Отписаться",
          key: "1",
        },
      ]}
    />
  );

  let followHandler = () => {
    props.follow();
    setFollow(!follow);
  };

  let unfollowHandler = () => {
    props.unfollow();
    setFollow(!follow);
  };
  //debugger;
  return (
    <div className="profileinfo">
      <div className="profileinfo__container">
        <div className="profileinfo__avatar">
          <img src={require("../img/logo.jpeg")} alt="avatar" />
        </div>
        {follow ? (
          <Dropdown.Button
            type="primary"
            overlay={menu}
            disabled={props.followingInProgress}
          >
            Вы подписаны
          </Dropdown.Button>
        ) : (
          <Button
            className="profileinfo__follow"
            onClick={() => followHandler()}
            disabled={props.followingInProgress}
          >
            Подписаться
          </Button>
        )}
      </div>
      <div className="profileinfo__description">
        <div className="profileinfo__nikname">{props.currentUser.nikname}</div>
        <ProfileStatus
          isFetching={props.isFetching}
          status={props.currentUser.status}
          updateStatus={props.updateStatus}
        />
        <div className="profileinfo__mail">
          Почта для связи: {props.currentUser.email}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
