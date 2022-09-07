import React, { createElement, useState } from "react";
import { useSelector } from "react-redux";
import { GrSend } from "react-icons/gr";
import { Avatar, Button, Comment, Form, Input, List, Tooltip } from "antd";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  UserOutlined,
  DeleteFilled
} from "@ant-design/icons";
import { MdModeEditOutline } from "react-icons/md";
import axios from "axios";
import { API_URL } from "../config";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../actions/comment";
const { TextArea } = Input;

const SingleComment = (props) => {
  const [value, setValue] = useState("");
  const [editableComment, setEditableComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [openReply, setOpenReply] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const textDelete = <span>Удалить</span>;
  const textEdit = <span>Редактировать</span>;
  const stateAuth = useSelector((state) => state.auth);
  const [comment, setComment] = useState(props.content);
  const dispatch = useDispatch();
  const commentAuthorAvatar = useSelector((state) => state.auth.avatar);
  const createdAt = new Date(props.commentdate);
  const createdDate = createdAt.toLocaleDateString('ru-RU');

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

  const handleCommentEdit = () => {
    setEditMode(true);
  };

  const ToggleReset = () => {
    setEditMode(false)
  };

  const saveEditedComment = (commentId, content) => {
    dispatch(updateComment(commentId, content));
    setEditMode(false)
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);
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
    <span>
      {editMode && (
        <span>
          <span onClick={ToggleReset} 
            style={{margin:"0 10px 0 0", border:"1px solid gray", borderRadius:"2px", padding:"1px"}}
          >
            Отмена
          </span>
          <span 
            onClick={() => saveEditedComment(props.comment.comment_id, editableComment)}
            style={{border:"1px solid gray", borderRadius:"2px", padding:"1px"}}
          >
            Сохранить
          </span>
        </span>
        )}
    </span>
    
  ];

  //Аватар коммента из списка комментов
  const avatarLogo = <Avatar size={32} icon={<UserOutlined />} />;

  const avatar = props.authorAvatar ? (
    <img src={`${API_URL}` + `${props.authorAvatar}`} alt="avatar" />
  ) : (
    avatarLogo
  );

  //Аватар поля ввода ответа (залогиненого пользователя)
  const avatarLoggedIn = commentAuthorAvatar ? (
    <img src={`${API_URL}` + `${commentAuthorAvatar}`} alt="avatar" />
  ) : (
    avatarLogo
  );

  let renderComment = (avatarLoggedIn) => {
    return (
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
    )
  }
    
  return (
    <>
    <div style={{display: "flex", justifyContent:"space-between"}}>
      <div>
        <Comment
          actions={actions}
          author={props.author && <a>{props.author}</a>}
          avatar={avatar}
          content={
            editMode 
            ? 
            <input 
            type="text" 
            placeholder={props.content} 
            style={{border:"1px solid gray", borderRadius:"2px", padding:"0 3px 0 3px"}}
            onChange={(e) => setEditableComment(e.target.value)}
            >
            </input>
            : 
            (
              props.comment_responsetonikname ? (
                <p>
                  <span style={{color:"#0088CC"}}>{`${props.comment_responsetonikname}`}</span><span>{`, ${props.content}`}</span> 
                </p>
              ) : (
                props.content && <p>{props.content}</p>
              )
            )
          }
          datetime={
              <span>
                {
                  //moment(props.commentdate).locale("ru").fromNow()
                  createdDate
                }
              </span>
          }
        />

        {openReply && (
          <div>
            {renderComment(avatarLoggedIn)}
          </div>
        )}
      </div>


      {
      stateAuth.nikname == props.author 
      ?
      (!editMode && (
      <div style={{padding:"37px 0px 0px 0px"}}>
        <Tooltip placement="top" title={textDelete}>
          <DeleteFilled 
            onClick={() => handleDeleteComment(props.comment.comment_id)}
            style={{margin:"0px 10px 0px 0px"}}
          />
        </Tooltip>
        <Tooltip placement="top" title={textEdit}>
            <MdModeEditOutline 
            onClick={() => {
              handleCommentEdit();
            }}
            />
        </Tooltip>
      </div>))
      : 
      <div className="comment__editblock"></div>}
    </div>
    </>
  );
};

export default SingleComment;
