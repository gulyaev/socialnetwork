import React, { useState } from "react";
import { Avatar, Button, Comment, Form, Input, List } from "antd";
import moment from "moment";
import { GrSend } from "react-icons/gr";
import axios from "axios";
const { TextArea } = Input;

//отрисовка компонента списка комментариев из массива комментов
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${
      comments.length > 1 ? "комментарии" : "комментарий"
    }`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

//форма отправки комментария
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div style={{ display: "flex" }}>
    <Form.Item style={{ flex: "1 1 auto", margin: "0 5px 0 0" }}>
      <TextArea rows={1} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button loading={submitting} onClick={onSubmit}>
        <GrSend size={20} />
      </Button>
    </Form.Item>
  </div>
);

const Comments = (props) => {
  const [comments, setComments] = useState([]);
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
          //формируем массив комментов для отображения комментов в UI
          setComments([
            ...comments,
            {
              //полученные данные парсим
              author: props.commentAuthor,
              avatar: "https://joeschmoe.io/api/v1/random",
              content: <p>{value}</p>,
              datetime: moment().fromNow(),
            },
          ]);
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
  debugger;
  return (
    <div className="comments">
      {console.log(props.commentLists)}
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  );
};

export default Comments;
