import { postApi } from "../api/api";

const SET_POSTS = "SET-POST";
const SET_SINGLE_POST = "SET-SINGLE-POST";
const ADD_STORY = "ADD-STORY";
const SET_IS_FETCHING = "SET-IS-FETCHING";

let initialState = {
  postsData: [],
  singlePostsData: [],
  isFetching: false,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        postsData: action.payload,
      };
    case SET_SINGLE_POST:
      return {
        ...state,
        singlePostsData: action.payload,
      };

    case ADD_STORY:
      let newStory = {
        id: Date.now(),
        title: action.payload.title,
        content: action.payload.content,
        person_id: action.payload.person_id,
        likes: action.payload.likes,
        dislikes: action.payload.dislikes,
        views: action.payload.views,
        comments: action.payload.comments,
        photo: action.payload.photo,
      };
      return {
        ...state,
        postsData: [...state.postsData, newStory],
      };
    case SET_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.payload,
      };
    }
    default:
      return state;
  }
};

export const setToggleIsFetchingActionCreator = (isFetching) => {
  return { type: SET_IS_FETCHING, payload: isFetching };
};

export const setPostsActionCreator = (data) => {
  return { type: SET_POSTS, payload: data };
};

export const setSinglePostActionCreator = (data) => {
  return { type: SET_SINGLE_POST, payload: data };
};

export const addStoryActionCreator = (data) => {
  return { type: ADD_STORY, payload: data };
};

export const getPostsByUserThunkCreator = () => {
  return (dispatch) => {
    dispatch(setToggleIsFetchingActionCreator(true));
    postApi.getPostsByUser().then((res) => {
      dispatch(setPostsActionCreator(res.data));
      dispatch(setToggleIsFetchingActionCreator(false));
    });
  };
};

export const getSinglePostThunkCreator = (postId) => {
  return (dispatch) => {
    dispatch(setToggleIsFetchingActionCreator(true));
    postApi.getSinglePost(postId).then((res) => {
      dispatch(setSinglePostActionCreator(res.data));
      dispatch(setToggleIsFetchingActionCreator(false));
    });
  };
};

export const likePost = (postId) => {
  return (dispatch) => {
    dispatch(setToggleIsFetchingActionCreator(true));
    postApi.likePost(postId).then((res) => {
      dispatch(setSinglePostActionCreator(res.data));
      dispatch(setToggleIsFetchingActionCreator(false));
    });
  };
};

export const dislikePost = (postId) => {
  return (dispatch) => {
    dispatch(setToggleIsFetchingActionCreator(true));
    postApi.dislikePost(postId).then((res) => {
      dispatch(setSinglePostActionCreator(res.data));
      dispatch(setToggleIsFetchingActionCreator(false));
    });
  };
};

export default postsReducer;
