import React from 'react'
import ProfileInfo from '../components/ProfileInfo'
import MyPostsContainer from '../components/myposts/MyPostsContainer'

const Profile = (props) => {
    return (
        <>
            <ProfileInfo />
            <MyPostsContainer store={props.store} />
        </>
    )
}

export default Profile