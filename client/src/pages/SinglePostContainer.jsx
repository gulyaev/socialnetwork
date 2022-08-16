import React from "react";
import SinglePost from "./SinglePost";
import { getSinglePostThunkCreator } from "../redux/postsReducer";
import { getPostsData } from "../redux/postsSelectors";
import { withMyRouter } from "../hoc/withMyRouter";
import { connect } from "react-redux";
import { compose } from "redux";

class SinglePostContainer extends React.Component {
  componentDidMount() {
    let postId = this.props.params.id;
    this.props.getSinglePostThunkCreator(postId);
  }

  render = () => {
    return <SinglePost postsData={this.props.postsData} />;
  };
}

let mapStateToProps = (state) => {
  return {
    postsData: getPostsData(state),
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
