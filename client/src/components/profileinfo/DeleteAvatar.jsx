import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import axios from "axios";
import { addFile } from "../../redux/fileReducer";

const DeleteAvatar = () => {
  const dispatch = useDispatch();

  let deleteAvatar = () => {
    return async (dispatch) => {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/avatar`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        alert(error.response.data.message);
      }
    };
  };
  return (
    <Button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</Button>
  );
};

export default DeleteAvatar;
