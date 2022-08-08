import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../actions/post";
import MainPagePost from "./MainPagePost";
import { BiComment } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

const MainPage = () => {
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.postsData.postsData);
  const commentAuthor = useSelector((state) => state.auth.nikname);
  const authorAvatar = useSelector((state) => state.auth.avatar);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div className="mainpage">
      {postsData.map((post) => {
        return (
          <MainPagePost
            postId={post.post_id}
            title={post.post_title}
            content={post.post_content}
            likes={post.post_likes}
            dislikes={post.post_dislikes}
            views={post.post_views}
            comments={post.post_comments}
            nikname={post.person_nikname}
            avatar={post.person_avatar}
            commentAuthor={commentAuthor}
            authorAvatar={authorAvatar}
          />
        );
      })}
    </div>
  );
};

export default MainPage;
