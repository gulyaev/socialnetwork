import React from "react";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { getPostsByUserThunkCreator } from "../../redux/postsReducer";

class MyPostsContainer extends React.Component {
  componentDidMount() {
    this.props.getPostsByUserThunkCreator();
  }

  render = () => {
    return (
      <MyPosts
        postsData={this.props.postsData}
        currentUser={this.props.currentUser}
      />
    );
  };
}

let mapStateToProps = (state) => {
  return {
    postsData: state.postsData,
    currentUser: state.usersData.currentUser,
  };
};

export default connect(mapStateToProps, { getPostsByUserThunkCreator })(
  MyPostsContainer
);
