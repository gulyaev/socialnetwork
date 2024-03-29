import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dropdown, Menu, Space, Button } from "antd";
import axios from "axios";
import { addFile } from "../../redux/fileReducer";

const LoadFoto = () => {
  const [load, setLoad] = useState(false);
  const [myFile, setMyFile] = useState();
  const dispatch = useDispatch();

  let selectFile = (e) => {
    setMyFile(e.target.files[0]);
    setLoad(!load);
  };

  let send = (file, dirId) => {
    return async (dispatch) => {
      try {
        setLoad(!load);
        const formData = new FormData();
        formData.append("file", file);
        if (dirId) {
          formData.append("parent", dirId);
        }
        const response = await axios.post(
          `http://localhost:5000/api/uploadfile`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(addFile(response.data));
      } catch (error) {
        alert(error.response.data.message);
      }
    };
  };

  if (!load) {
    return (
      <>
        <label htmlFor="file" className="profileinfo__uploadfoto">
          Загрузить файл
        </label>
        <input
          type="file"
          accept=".jpg"
          id="file"
          name="uploaded_file"
          style={{ display: "none" }}
          onChange={(e) => {
            selectFile(e);
          }}
        />
      </>
    );
  } else {
    return <Button onClick={() => dispatch(send(myFile))}>Опубликовать</Button>;
  }
};

export default LoadFoto;
