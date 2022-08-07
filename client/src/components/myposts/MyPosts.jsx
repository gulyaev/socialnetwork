import React from "react";
import Post from "../Post";
import { Typography } from "antd";
const { Title } = Typography;

const MyPosts = (props) => {
  return (
    <div className="myposts">
      <div className="myposts__container">
        <div className="myposts__posts posts">
          {props.postsData.postsData.map((post) => {
            return (
              <Post
                title={post.title}
                content={post.content}
                likes={post.likes}
                dislikes={post.dislikes}
                views={post.views}
                comments={post.comments}
                currentUser={props.currentUser}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
