import React from "react";
import SinglePost from "./SinglePost";
import { getSinglePostThunkCreator } from "../redux/postsReducer";
import { getSinglePostsData } from "../redux/postsSelectors";
import { getAuth } from "../redux/authSelectors";
import { withMyRouter } from "../hoc/withMyRouter";
import { connect } from "react-redux";
import { compose } from "redux";

class SinglePostContainer extends React.Component {
  componentDidMount() {
    let postId = this.props.params.id;
    this.props.getSinglePostThunkCreator(postId);
  }

  render = () => {
    return (
      <SinglePost
        singlePostsData={this.props.singlePostsData}
        stateAuth={this.props.stateAuth}
      />
    );
  };
}

let mapStateToProps = (state) => {
  return {
    singlePostsData: getSinglePostsData(state),
    stateAuth: getAuth(state),
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getSinglePostThunkCreator: (postId) =>
      dispatch(getSinglePostThunkCreator(postId)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withMyRouter
)(SinglePostContainer);
