import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [toggleNextComments, setToggleNextComments] = useState(false);
  const [childCommentNumber, setChildCommentNumber] = useState(0);

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
          <div style={{ padding: "0 0 0 40px" }} onClick={showHideNextComments}>
            Показать следующие {childCommentNumber} комментарии
          </div>
        )}
        {toggleNextComments && renderReplyComment()}
      </>
    );
  } else {
    return <div></div>;
  }
}

export default ReplyComment;
