import React, { useState } from "react";
import ProfileStatus from "./profilestatus/ProfileStatus";
import { API_URL } from "../config";
import { Avatar, Dropdown, Menu, Button } from "antd";
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const ProfileInfo = ({
  currentUser,
  isFetching,
  userId,
  followingInProgress,
  ...props
}) => {
  const [follow, setFollow] = useState(false);
  const isAuth = props.stateAuth.isAuth;
  const profileAvatar = currentUser.avatar;

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

  const avatarLogo = <Avatar shape="square" size={155} icon={<UserOutlined />} />;

  const avatar = profileAvatar ? (
    <img src={`${API_URL}` + `${profileAvatar}`} alt="avatar" />
  ) : (
    avatarLogo
  );

  return (
    <div className="profileinfo">
      <div className="profileinfo__container">
        <div className="profileinfo__avatar">
        {isAuth ? avatar : avatarLogo}
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
