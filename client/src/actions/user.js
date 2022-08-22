import axios from "axios";
import { initializeAppThunkCreator } from "../redux/appReducer";
import { logoutActionCreator } from "../redux/authReducer";

export const updateProfile = (userId, nikname, email, password) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      const bodyParameters = {
        nikname,
        email,
        password,
      };

      const response = await axios.put(
        `http://localhost:5000/api/user/` + userId,
        bodyParameters,
        config
      );
      dispatch(initializeAppThunkCreator());
    } catch (error) {
      alert(error);
    }
  };
};

export const deleteProfile = (userId) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      const response = await axios.delete(
        `http://localhost:5000/api/user/` + userId,
        config
      );
      dispatch(logoutActionCreator());
    } catch (error) {
      alert(error);
    }
  };
};
