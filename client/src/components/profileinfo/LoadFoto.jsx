import React, { useState } from "react";
import { Dropdown, Menu, Space, Button } from "antd";
import axios from "axios";

const LoadFoto = () => {
  const [load, setLoad] = useState(false);
  const [myFile, setMyFile] = useState();

  let selectFile = (e) => {
    setMyFile(e.target.files[0]);
    setLoad(!load);
  };

  let send = async () => {
    setLoad(!load);
    const data = new FormData();
    data.append("file", myFile);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios
      .post("http://localhost:5000/api/uploadfile", data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (!load) {
    return (
      <>
        <label htmlFor="file" className="profileinfo__uploadfoto">
          Загрузить фото
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
    return <Button onClick={() => send()}>Опубликовать</Button>;
  }
};

export default LoadFoto;
