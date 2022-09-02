import React, { createElement, useState } from "react";
import moment from "moment";
import { GrSend } from "react-icons/gr";
import { Avatar, Button, Comment, Form, Input, List, Tooltip } from "antd";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  UserOutlined
} from "@ant-design/icons";
import axios from "axios";
import { API_URL } from "../config";
const { TextArea } = Input;

const SingleComment = (props) => {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [openReply, setOpenReply] = useState(false);

  const handleSubmit = (e) => {
    if (!value) return;
    setSubmitting(true);

    const bodyParameters = {
      content: value,
      response_to: props.comment.comment_id,
      postId: props.postId,
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .post(`http://localhost:5000/api/commentreply`, bodyParameters, config)
      .then((response) => {
        if (response.data.success) {
          setValue("");
          setOpenReply(!openReply);
          console.log(response.data.result);
          props.refreshFunction(response.data.result);
          setSubmitting(false);
        } else {
          alert("Failed to send comment");
        }
      });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const ToggleOpenReply = () => {
    setOpenReply(!openReply);
  };

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span onClick={ToggleOpenReply} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  //Аватар коммента из списка комментов
  const avatarLogo = <Avatar size={32} icon={<UserOutlined />} />;

  const avatar = props.authorAvatar ? (
    <img src={`${API_URL}` + `${props.authorAvatar}`} alt="avatar" />
  ) : (
    avatarLogo
  );

  //Аватар поля ввода ответа (залогиненого пользователя)
  const avatarLoggedIn = props.avatarLoggedIn ? (
    <img src={`${API_URL}` + `${props.avatarLoggedIn}`} alt="avatar" />
  ) : (
    avatarLogo
  );

  return (
    <>
      <Comment
        actions={actions}
        author={props.author && <a>{props.author}</a>}
        avatar={avatar}
        content={props.content && <p>{props.content}</p>}
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />

      {openReply && (
        <div>
          <Comment
            style={{ padding: "0 0 0 40px" }}
            avatar={avatarLoggedIn}
            content={
              <div style={{ display: "flex" }}>
                <Form.Item style={{ flex: "0 1 447px", margin: "0 5px 0 0" }}>
                  <TextArea
                    rows={1}
                    onChange={handleChange}
                    value={value}
                    placeholder={"Введите ответ на комментарий"}
                  />
                </Form.Item>
                <Form.Item>
                  <Button loading={submitting} onClick={handleSubmit}>
                    <GrSend size={20} />
                  </Button>
                </Form.Item>
              </div>
            }
          />
        </div>
      )}
    </>
  );
};

export default SingleComment;
