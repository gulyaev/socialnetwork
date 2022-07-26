import React from "react";
import { addPost } from "../../redux/postsReducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

class MyPostsContainer extends React.Component {
  addPost = (text) => {
    this.props.addPost(text);
  };

  render = () => {
    return <MyPosts addPost={this.addPost} postsData={this.props.postsData} />;
  };
}

let mapStateToProps = (state) => {
  return {
    postsData: state.postsData,
  };
};

export default connect(mapStateToProps, { addPost })(MyPostsContainer);
