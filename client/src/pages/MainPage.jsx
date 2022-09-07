import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../actions/post";
import MainPagePostContainer from "./mainpagepost/MainPagePostContainer";
import { BiComment } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useLocation } from "react-router";

const MainPage = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();

  const postsData = useSelector((state) => state.postsData.postsData);
  const commentAuthorName = useSelector((state) => state.auth.nikname);
  const commentAuthorAvatar = useSelector((state) => state.auth.avatar);
  const stateAuth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllPosts(search));
  }, [search]);

  return (
    <div className="mainpage">
      {postsData.map((post) => {
        return (
          <MainPagePostContainer
            postId={post.post_id}
            title={post.post_title}
            content={post.post_content}
            stateLikes={post.post_likes}
            stateDislikes={post.post_dislikes}
            views={post.post_views}
            comments={post.post_comments}
            categories={post.post_categories}
            postdate={post.post_postdate}
            photo={post.post_photo}
            nikname={post.person_nikname}
            avatar={post.person_avatar}
            commentAuthorName={commentAuthorName}
            commentAuthorAvatar={commentAuthorAvatar}
            stateAuth={stateAuth}
          />
        );
      })}
    </div>
  );
};

export default MainPage;
