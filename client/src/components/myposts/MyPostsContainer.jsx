import React from 'react'
import { addPostActionCreator } from '../../redux/postsReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        postsData: state.postsData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (text) => { dispatch(addPostActionCreator(text)) }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer