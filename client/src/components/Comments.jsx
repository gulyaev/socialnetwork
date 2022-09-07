import React, { useState, useEffect } from "react";
import moment from "moment";
import { GrSend } from "react-icons/gr";
import axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { UserOutlined } from "@ant-design/icons";
import { Button, Comment, Form, Input, List, Avatar, Tooltip } from "antd";
import { API_URL } from "../config";
const { TextArea } = Input;

//форма отправки комментария
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div style={{ display: "flex" }}>
    <Form.Item style={{ flex: "1 1 auto", margin: "0 5px 0 0" }}>
      <TextArea
        rows={1}
        onChange={onChange}
        value={value}
        placeholder={
          "Чтобы оставить комментарий необходимо зарегистрироваться или войти"
        }
      />
    </Form.Item>
    <Form.Item>
      <Button loading={submitting} onClick={onSubmit}>
        <GrSend size={20} />
      </Button>
    </Form.Item>
  </div>
);

const Comments = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);

    const bodyParameters = {
      content: value,
      postId: props.postId,
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .post(`http://localhost:5000/api/comment`, bodyParameters, config)
      .then((response) => {
        if (response.data.success) {
          setValue("");
          props.refreshFunction(response.data.result);
          setSubmitting(false);
        } else {
          alert("Failed to send comment");
        }
      });
    props.setReady(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  //Аватар поля воода коммента (залогиненого пользователя)
  const avatarLogo = <Avatar size={32} icon={<UserOutlined />} />;

  const avatar = props.commentAuthorAvatar ? (
    <img src={`${API_URL}` + `${props.commentAuthorAvatar}`} alt="avatar" />
  ) : (
    avatarLogo
  );

  return (
    <div className="comments">
      {props.commentLists &&
        props.commentLists.map((comment, index) => {
          return (
            !comment.comment_responseto && 
            (
              <>
                <SingleComment
                  comment={comment} //поля в таблице comment bd
                  author={comment.person_nikname}
                  authorAvatar={comment.person_avatar}
                  avatarLoggedIn={props.commentAuthorAvatar}
                  content={comment.comment_content}
                  commentdate={comment.comment_commentdate}
                  refreshFunction={props.refreshFunction}
                  postId={props.postId}
                  stateAuth={props.stateAuth}
                />
                <ReplyComment
                  commentLists={props.commentLists}
                  refreshFunction={props.refreshFunction}
                  postId={props.postId}
                  parentCommentId={comment.comment_id}
                  avatarLoggedIn={props.commentAuthorAvatar}
                  commentdate={comment.comment_commentdate}
                />
              </>
            )
          );
        })}
      {
        <Comment
          avatar={avatar}
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      }
    </div>
  );
};

export default Comments;
