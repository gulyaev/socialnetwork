import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import { API_URL } from "../config";
import { Avatar } from "antd";
import {
  UserOutlined
} from "@ant-design/icons";

function ReplyComment(props) {
  const [toggleNextComments, setToggleNextComments] = useState(false);
  const [childCommentNumber, setChildCommentNumber] = useState(0);

  //Аватар поля ввода ответа (залогиненого пользователя)
  const avatarLogo = <Avatar size={32} icon={<UserOutlined />} />;

  const avatarLoggedIn = props.avatarLoggedIn ? (
    <img src={`${API_URL}` + `${props.avatarLoggedIn}`} alt="avatar" />
  ) : (
    avatarLogo
  );

  useEffect(() => {
    let commentNumber = 0;
    props.commentLists.map((comment) => {
      if (comment.comment_responseto === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, []);

  const showHideNextComments = () => {
    setToggleNextComments(!toggleNextComments);
  };

  let renderReplyComment = () => {
    return (
      props.commentLists &&
      props.commentLists.map((comment, index) => {
        return (
          comment.comment_responseto && (
            <div style={{ padding: "0 0 0 40px" }}>
              {comment.comment_responseto === props.parentCommentId && (
                <>
                  <SingleComment
                    comment={comment} //поля в таблице comment bd
                    comment_responsetonikname={comment.comment_responsetonikname}
                    author={comment.person_nikname}
                    content={comment.comment_content}
                    refreshFunction={props.refreshFunction}
                    postId={props.postId}
                    stateAuth={props.stateAuth}
                    authorAvatar={comment.person_avatar}
                    avatarLoggedIn={props.commentAuthorAvatar}
                    commentdate={comment.comment_commentdate}
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
              )}
            </div>
          )
        );
      })
    );
  };

  if (childCommentNumber) {
    return (
      <>
        {childCommentNumber && (
          !toggleNextComments ?
          <div style={{ padding: "0 0 0 40px", fontSize:"13px", fontWeight:"bold", cursor:"pointer" }} onClick={showHideNextComments}>
            Показать следующие комментарии
          </div>
          : <div style={{ padding: "0 0 0 40px", fontSize:"13px", fontWeight:"bold", cursor:"pointer" }} onClick={showHideNextComments}>
          Скрыть комментарии
        </div>
        )}
        {
        toggleNextComments && renderReplyComment()}
      </>
    );
  } else {
    return <div></div>;
  }
}

export default ReplyComment;
