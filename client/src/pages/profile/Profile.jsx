import React from "react";
import ProfileInfo from "../../components/ProfileInfo";
import MyPostsContainer from "../../components/myposts/MyPostsContainer";

const Profile = ({
  currentUser,
  follow,
  unfollow,
  followingInProgress,
  updateStatus,
  isFetching,
}) => {
  return (
    <>
      <ProfileInfo
        currentUser={currentUser}
        follow={follow}
        unfollow={unfollow}
        followingInProgress={followingInProgress}
        updateStatus={updateStatus}
        isFetching={isFetching}
      />
      <MyPostsContainer />
    </>
  );
};

export default Profile;
