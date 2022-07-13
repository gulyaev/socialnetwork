import React from 'react'
import ProfileInfo from '../components/ProfileInfo'
import MyPosts from '../components/MyPosts'

const Profile = (props) => {
    return (
        <>
            <ProfileInfo />
            <MyPosts postsData={props.postsData} dispatch={props.dispatch} />
        </>
    )
}

export default Profile