import React from "react";
import { BiComment } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

const Post = (props) => {
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
          <div>{props.likes - props.dislikes}</div>
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
                  <div className="user__avatar-small">
                    <img src="" alt="" />
                  </div>
                  <div className="user__nickname">
                    {props.currentUser.nikname}
                  </div>
                  <div className="user__time">5 дней назад</div>
                </div>
              </div>
              <h2 className="story__title">{props.title}</h2>
            </div>
          </div>

          <div className="story__content">
            <div className="story__container">
              <p>{props.content}</p>
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
        </div>
      </div>
    </div>
  );
};

export default Post;
