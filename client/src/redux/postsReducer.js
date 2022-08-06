const ADD_POST = "ADD-POST";
const ADD_STORY = "ADD-STORY";

let initialState = {
  postsData: [
    {
      id: 3,
      title: "Title 1",
      content: "Content 1",
      person_id: 40,
      likes: 1,
      dislikes: 1,
      views: 1,
      comments: 1,
    },
  ],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
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
      };
      return {
        ...state,
        postsData: [...state.postsData, newStory],
      };
    default:
      return state;
  }
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

export default postsReducer;
