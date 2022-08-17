import React, { useEffect, useState } from "react";
import { BiComment } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { API_URL } from "../config";
import { NavLink } from "react-router-dom";
import Comments from "../components/Comments";
import moment from "moment";
import "moment/locale/ru";
import { DeleteFilled } from "@ant-design/icons";
import { MdModeEditOutline } from "react-icons/md";
import { Tooltip } from "antd";

const SinglePost = (props) => {
  const [commentLists, setCommentLists] = useState([]);
  const [ready, setReady] = useState([]);
  const textDelete = <span>Удалить</span>;
  const textEdit = <span>Редактировать</span>;
  const avatarLogo = <Avatar size={20} icon={<UserOutlined />} />;
  const avatar = props.singlePostsData.person_avatar ? (
    <img
      src={`${API_URL}` + `${props.singlePostsData.person_avatar}`}
      alt="avatar"
    />
  ) : (
    avatarLogo
  );

  const updateComment = (newCommentLists) => {
    setCommentLists(newCommentLists);
  };

  const postPhoto = props.singlePostsData.post_photo && (
    <img
      src={`${API_URL}` + `${props.singlePostsData.post_photo}`}
      alt="photo"
    />
  );

  const handleDelete = () => {
    alert("delete");
  };

  const handleEdit = () => {
    alert("edit");
  };

  return (
    <div className="singlepostpage">
      <div className="story">
        <div className="story__left">
          <AiFillLike
            style={{
              fontSize: "25px",
              color: "#757575",
              cursor: "pointer",
            }}
            onMouseOver={({ target }) => (target.style.color = "#75aa4b")}
            onMouseOut={({ target }) => (target.style.color = "#757575")}
          />
          <div>
            {props.singlePostsData.post_likes -
              props.singlePostsData.post_dislikes}
          </div>
          <AiFillDislike
            style={{
              fontSize: "25px",
              color: "#757575",
              cursor: "pointer",
              transform: "scale(-1, 1)",
            }}
            onMouseOver={({ target }) => (target.style.color = "red")}
            onMouseOut={({ target }) => (target.style.color = "#757575")}
          />
        </div>

        <div className="story__main">
          <div className="story__header">
            <div className="story__container">
              <div className="story__user user">
                <div className="user__info">
                  <div className="user__infoblock">
                    <div className="user__avatar-small">{avatar}</div>
                    <div className="user__nickname">
                      <NavLink
                        to={`/?user=${props.singlePostsData.person_nikname}`}
                        className="user__nickname"
                      >
                        {props.singlePostsData.person_nikname}
                      </NavLink>
                    </div>
                    <div className="user__time">
                      {moment(props.singlePostsData.post_postdate)
                        .locale("ru")
                        .fromNow()}
                    </div>
                  </div>
                  {props.stateAuth.nikname ==
                  props.singlePostsData.person_nikname ? (
                    <div className="user__editblock">
                      <Tooltip placement="top" title={textDelete}>
                        <div
                          className="user__deleteicon"
                          onClick={handleDelete}
                        >
                          <DeleteFilled />
                        </div>
                      </Tooltip>
                      <Tooltip placement="top" title={textEdit}>
                        <div className="user__editicon" onClick={handleEdit}>
                          <MdModeEditOutline />
                        </div>
                      </Tooltip>
                    </div>
                  ) : (
                    <div className="user__editblock"></div>
                  )}
                </div>
              </div>
              <NavLink to={`/post/${props.singlePostsData.post_id}`}>
                <h2 className="story__title">
                  {props.singlePostsData.post_title}
                </h2>
              </NavLink>
            </div>
          </div>

          <div className="story__content">
            <div className="story__container">
              <div className="story__photo">{postPhoto}</div>
              <p>{props.singlePostsData.post_content}</p>
            </div>
          </div>
          <div className="story__tags tags">
            <div className="story__container">
              {props.singlePostsData.post_categories && (
                <div
                  style={{
                    display: "flex",
                    paddingTop: "16px",
                    paddingBottom: "16px",
                    fontSize: "13px",
                    color: "#757575",
                  }}
                >
                  {props.singlePostsData.post_categories.map((category) => {
                    return (
                      <div
                        style={{
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                      >
                        {category}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
