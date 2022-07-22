import React from "react";
import ProfileInfo from "../../components/ProfileInfo";
import MyPostsContainer from "../../components/myposts/MyPostsContainer";
import { Navigate } from "react-router-dom";

const Profile = (props) => {
  if (!props.isAuth) {
    alert("Войдите чтобы посмотреть профиль");
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <ProfileInfo
        currentUser={props.currentUser}
        follow={props.follow}
        unfollow={props.unfollow}
        followingInProgress={props.followingInProgress}
      />
      <MyPostsContainer />
    </>
  );
};

export default Profile;
