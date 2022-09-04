import React, { Component } from 'react'
import MainPagePost from "./MainPagePost";
import {likePost, dislikePost} from "../../redux/postsReducer"
import {connect} from "react-redux"

class MainPagePostContainer extends React.Component {
  likePostHandler = (postId) => {
    this.props.likePost(postId)
  }

  dislikePostHandler = (postId) => {
    this.props.dislikePost(postId)
  }

  render() {
    return (
      <MainPagePost 
        postId={this.props.postId}
        title={this.props.title}
        content={this.props.content}
        stateLikes={this.props.stateLikes}
        stateDislikes={this.props.stateDislikes}
        likes={this.props.likes}
        dislikes={this.props.dislikes}
        views={this.props.views}
        comments={this.props.comments}
        categories={this.props.categories}
        postdate={this.props.postdate}
        photo={this.props.photo}
        nikname={this.props.nikname}
        avatar={this.props.avatar}
        commentAuthorName={this.props.commentAuthorName}
        commentAuthorAvatar={this.props.commentAuthorAvatar}
        likePostHandler={this.likePostHandler}
        dislikePostHandler={this.dislikePostHandler}
      />
    )
  }
}

// let mapStateToProps = (state) => {
//   return {
//     likes: state.postsData.singlePostsData.likes,
//     dislikes: state.postsData.singlePostsData.dislikes
//   }
// }

export default connect(null, {likePost, dislikePost})(MainPagePostContainer)