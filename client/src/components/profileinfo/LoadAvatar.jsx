import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import axios from "axios";

const LoadAvatar = () => {
  const [load, setLoad] = useState(false);
  const [myAvatar, setMyAvatar] = useState();
  const dispatch = useDispatch();

  let selectAvatar = (e) => {
    setMyAvatar(e.target.files[0]);
    setLoad(!load);
  };

  let uploadAvatar = (file) => {
    return async (dispatch) => {
      try {
        setLoad(!load);
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post(
          `http://localhost:5000/api/avatar`,
          formData,
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

  if (!load) {
    return (
      <>
        <label htmlFor="avatar" className="profileinfo__uploadfoto">
          Загрузить аватар
        </label>
        <input
          type="file"
          accept=".jpg"
          id="avatar"
          name="uploaded_file"
          style={{ display: "none" }}
          onChange={(e) => {
            selectAvatar(e);
          }}
        />
      </>
    );
  } else {
    return (
      <Button onClick={() => dispatch(uploadAvatar(myAvatar))}>
        Опубликовать
      </Button>
    );
  }
};

export default LoadAvatar;
