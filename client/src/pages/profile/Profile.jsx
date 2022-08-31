import React, {useEffect} from "react";
import ProfileInfo from "../../components/ProfileInfo";
import MyPostsContainer from "../../components/myposts/MyPostsContainer";

const Profile = ({
  currentUser,
  isFetching,
  userId,
  stateAuth,
  followingInProgress,
  follow,
  unfollow,
  updateStatus,
}) => {
  return (
    <>
      <ProfileInfo
        currentUser={currentUser}
        isFetching={isFetching}
        userId={userId}
        stateAuth={stateAuth}
        followingInProgress={followingInProgress}
        follow={follow}
        unfollow={unfollow}
        updateStatus={updateStatus}
      />
      <MyPostsContainer />
    </>
  );
};

export default Profile;
