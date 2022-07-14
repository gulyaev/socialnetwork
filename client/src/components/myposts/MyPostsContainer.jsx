import React from 'react'
import { addPostActionCreator } from '../../redux/postsReducer';
import MyPosts from './MyPosts';

const MyPostsContainer = (props) => {
    const state = props.store.getState()

    const addPost = (text) => {
        props.store.dispatch(addPostActionCreator(text))
    }

    return (
        <MyPosts postsData={state.postsData} addPost={addPost} />
    )
}

export default MyPostsContainer