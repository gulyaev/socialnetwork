import axios from "axios";
import { addStoryActionCreator } from "../redux/postsReducer";

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
