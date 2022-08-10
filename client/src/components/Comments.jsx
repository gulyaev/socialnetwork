import React, { useState, useEffect } from "react";
import { Avatar, Button, Comment, Form, Input, List } from "antd";
import { Tooltip } from "antd";
import moment from "moment";
import { GrSend } from "react-icons/gr";
import axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
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
  debugger;
  return (
    <div className="comments">
      {props.commentLists &&
        props.commentLists.map((comment, index) => {
          return (
            !comment.comment_responseto && (
              <>
                <SingleComment
                  comment={comment} //поля в таблице comment bd
                  author={comment.person_nikname}
                  content={comment.comment_content}
                  refreshFunction={props.refreshFunction}
                  postId={props.postId}
                />
                <ReplyComment
                  commentLists={props.commentLists}
                  refreshFunction={props.refreshFunction}
                  postId={props.postId}
                  parentCommentId={comment.comment_id}
                />
              </>
            )
          );
        })}
      {
        <Comment
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          }
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
