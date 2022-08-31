import React, { useState } from "react";
import ProfileStatus from "./profilestatus/ProfileStatus";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Button } from "antd";

const ProfileInfo = ({
  currentUser,
  isFetching,
  userId,
  followingInProgress,
  ...props
}) => {
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
            disabled={followingInProgress}
          >
            Вы подписаны
          </Dropdown.Button>
        ) : (
          userId!==currentUser.id && (
          <Button
            className="profileinfo__follow"
            onClick={() => followHandler()}
            disabled={followingInProgress}
          >
            Подписаться
          </Button>
          )
          
        )}
      </div>
      <div className="profileinfo__description">
        <div className="profileinfo__nikname">{currentUser.nikname}</div>
        <ProfileStatus
          isFetching={isFetching}
          status={currentUser.status}
          updateStatus={props.updateStatus}
          userId={userId}
          currentUser={currentUser}
        />
        <div className="profileinfo__mail">
          Почта для связи: {currentUser.email}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
