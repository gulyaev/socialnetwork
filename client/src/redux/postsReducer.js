import { postApi } from "../api/api";

const SET_POSTS = "SET-POST";
const SET_SINGLE_POST = "SET-SINGLE-POST";
const ADD_POST = "ADD-POST";
const ADD_STORY = "ADD-STORY";

let initialState = {
  postsData: [],
  singlePostsData: [],
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
    case ADD_POST:
      let newPost = {
        id: Date.now(),
        text: action.payload,
        likesCount: 53,
        disLikesCount: 3,
      };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
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
    default:
      return state;
  }
};

export const setPostsActionCreator = (data) => {
  return { type: SET_POSTS, payload: data };
};

export const setSinglePostActionCreator = (data) => {
  return { type: SET_SINGLE_POST, payload: data };
};

export const addPostActionCreator = (text) => {
  return { type: ADD_POST, payload: text };
};

export const addStoryActionCreator = (data) => {
  return { type: ADD_STORY, payload: data };
};

export const addPost = (text) => {
  return (dispatch) => {
    dispatch(addPostActionCreator(text));
  };
};

export const getPostsByUserThunkCreator = () => {
  return (dispatch) => {
    //dispatch(setToggleIsFetchingActionCreator(true));
    postApi.getPostsByUser().then((res) => {
      //dispatch(setToggleIsFetchingActionCreator(false));
      dispatch(setPostsActionCreator(res.data));
    });
  };
};

export const getSinglePostThunkCreator = (postId) => {
  return (dispatch) => {
    //dispatch(setToggleIsFetchingActionCreator(true));
    postApi.getSinglePost(postId).then((res) => {
      //dispatch(setToggleIsFetchingActionCreator(false));
      dispatch(setSinglePostActionCreator(res.data));
    });
  };
};

export default postsReducer;
