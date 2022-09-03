import React, { useState, useEffect } from "react";
import { BiComment } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { API_URL } from "../config";
import { NavLink } from "react-router-dom";
import Comments from "../components/Comments";
import axios from "axios";
//import moment from "moment";
//import "moment/locale/ru";

const MainPagePost = (props) => {
  const [commentLists, setCommentLists] = useState([]);
  const [ready, setReady] = useState([]);
  const avatarLogo = <Avatar size={20} icon={<UserOutlined />} />;
  const avatar = props.avatar ? (
    <img src={`${API_URL}` + `${props.avatar}`} alt="avatar" />
  ) : (
    avatarLogo
  );

  useEffect(() => {
    console.log("inside useEffect");
    const bodyParameters = {
      postId: props.postId,
    };

    axios
      .post(`http://localhost:5000/api/commentbypostid`, bodyParameters)
      .then((response) => {
        if (response.data.success) {
          setCommentLists(response.data.comments);
        } else {
          alert("Failed to load comments");
        }
      });
  }, []);

  const updateComment = (newCommentLists) => {
    setCommentLists(newCommentLists);
  };

  const postPhoto = props.photo && (
    <img src={`${API_URL}` + `${props.photo}`} alt="photo" />
  );

  const createdAt = new Date(props.postdate);
  const createdDate = createdAt.toLocaleDateString('ru-RU');

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
            onMouseOver={({ target }) => (target.style.color = "#E54B4A")}
            onMouseOut={({ target }) => (target.style.color = "#757575")}
          />
          <div>{props.likes - props.dislikes}</div>
          <AiFillDislike
            style={{
              fontSize: "25px",
              color: "#757575",
              cursor: "pointer",
              transform: "scale(-1, 1)",
            }}
            onMouseOver={({ target }) => (target.style.color = "#0088CC")}
            onMouseOut={({ target }) => (target.style.color = "#757575")}
          />
        </div>

        <div className="story__main">
          <div className="story__header">
            <div className="story__container">
              <div className="story__user user">
                <div className="user__info">
                  <div className="user__avatar-small">{avatar}</div>
                  <div className="user__nickname">{props.nikname}</div>
                  <div className="user__time">
                    {/* {moment(props.postdate).locale("ru").fromNow()} */}
                    {createdDate}
                  </div>
                </div>
              </div>
              <NavLink to={`/post/${props.postId}`}>
                <h2 className="story__title">{props.title}</h2>
              </NavLink>
            </div>
          </div>

          <div className="story__content">
            <div className="story__container">
              <div className="story__photo">{postPhoto}</div>
              <p>{props.content}</p>
            </div>
          </div>
          <div className="story__tags tags">
            <div className="story__container">
              {props.categories && (
                <div
                  style={{
                    display: "flex",
                    paddingTop: "16px",
                    paddingBottom: "16px",
                    fontSize: "13px",
                    color: "#757575",
                  }}
                >
                  {props.categories.map((category) => {
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
          <div className="story__footer sectiongray">
            <div className="story__container">
              <div className="make-flex">
                <div className="story__tools">
                  <div className="story__comments">
                    <span className="story__comments-icon">
                      <BiComment style={{ fontSize: "20px" }} />
                    </span>
                    <span className="story__comments-count">
                      {props.comments}
                    </span>
                  </div>
                  <div className="story__views">
                    <span className="story__views-icon">
                      <IoEyeOutline style={{ fontSize: "20px" }} />
                    </span>
                    <span className="story__views-count">{props.views}</span>
                  </div>
                </div>
                <div className="story__emotions"></div>
              </div>
            </div>
          </div>
          <div className="story__commentslist">
            <div className="story__container">
              {
                <Comments
                  commentLists={commentLists}
                  postId={props.postId}
                  refreshFunction={updateComment}
                  commentAuthorName={props.commentAuthorName}
                  commentAuthorAvatar={props.commentAuthorAvatar}
                  setReady={setReady}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPagePost;
