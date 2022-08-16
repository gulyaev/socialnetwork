import axios from "axios";
import {
  addStoryActionCreator,
  setPostsActionCreator,
} from "../redux/postsReducer";

export const addStory = (title, content) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      const bodyParameters = {
        title,
        content,
      };

      const response = await axios.post(
        "http://localhost:5000/api/post",
        bodyParameters,
        config
      );
      dispatch(addStoryActionCreator(response.data));
    } catch (error) {
      alert(error);
    }
  };
};

export const getAllPosts = (search) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/allpost/` + search
      );
      dispatch(setPostsActionCreator(response.data));
    } catch (error) {
      alert(error);
    }
  };
};
