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

const SinglePost = (props) => {
  const [commentLists, setCommentLists] = useState([]);
  const [ready, setReady] = useState([]);
  const avatarLogo = <Avatar size={20} icon={<UserOutlined />} />;
  const avatar = props.postsData.person_avatar ? (
    <img src={`${API_URL}` + `${props.postsData.person_avatar}`} alt="avatar" />
  ) : (
    avatarLogo
  );

  const updateComment = (newCommentLists) => {
    setCommentLists(newCommentLists);
  };

  const postPhoto = props.postsData.post_photo && (
    <img src={`${API_URL}` + `${props.postsData.post_photo}`} alt="photo" />
  );
  debugger;
  return (
    <div className="postpage">
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
            {props.postsData.post_likes - props.postsData.post_dislikes}
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
                  <div className="user__avatar-small">{avatar}</div>
                  <div className="user__nickname">
                    {props.postsData.person_nikname}
                  </div>
                  <div className="user__time">
                    {moment(props.postsData.post_postdate)
                      .locale("ru")
                      .fromNow()}
                  </div>
                </div>
              </div>
              <NavLink to={`/post/${props.postsData.post_id}`}>
                <h2 className="story__title">{props.postsData.post_title}</h2>
              </NavLink>
            </div>
          </div>

          <div className="story__content">
            <div className="story__container">
              <div className="story__photo">{postPhoto}</div>
              <p>{props.postsData.post_content}</p>
            </div>
          </div>
          <div className="story__tags tags">
            <div className="story__container">
              {props.postsData.post_categories && (
                <div
                  style={{
                    display: "flex",
                    paddingTop: "16px",
                    paddingBottom: "16px",
                    fontSize: "13px",
                    color: "#757575",
                  }}
                >
                  {props.postsData.post_categories.map((category) => {
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
