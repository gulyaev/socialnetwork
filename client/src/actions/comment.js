import axios from "axios";

export const deleteComment = (commentId) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios.delete(`http://localhost:5000/api/deletecomment/`+ commentId,
      config
    );
  } catch (error) {
    alert(error);
  }
};

export const updateComment = (commentId, content) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      const bodyParameters = {
        content,
      };

      const response = await axios.put(
        `http://localhost:5000/api/comment/` + commentId,
        bodyParameters,
        config
      );
      //dispatch(addStoryActionCreator(response.data));
    } catch (error) {
      alert(error);
    }
  };
};
