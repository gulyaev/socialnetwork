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

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  debugger;
  return (
    <div className="mainpage">
      {postsData.map((post) => {
        return (
          <MainPagePost
            title={post.title}
            content={post.content}
            likes={post.likes}
            dislikes={post.dislikes}
            views={post.views}
            comments={post.comments}
            nikname={post.nikname}
            avatar={post.avatar}
          />
        );
      })}
    </div>
  );
};

export default MainPage;
