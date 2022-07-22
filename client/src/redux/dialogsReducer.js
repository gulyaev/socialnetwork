const ADD_MESSAGE = "ADD-MESSAGE";

let initialState = {
  messageData: {},
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const addMessageActionCreator = (message) => {
  return { type: ADD_MESSAGE, payload: message };
};

export default dialogsReducer;
