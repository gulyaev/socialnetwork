import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStory } from "../actions/post";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { Image } from "antd";

const AddPostPage = () => {
  const dispatch = useDispatch();
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const [myFile, setMyFile] = useState();

  let selectFile = (e) => {
    setMyFile(e.target.files[0]);
    setLoad(!load);
  };

  let publish = (header, content, file) => {
    if (header === "") {
      setError("Введите текст заголовка")
      return
    }
    if (content === "") {
      setError("Введите текст поста")
      return
    }
    dispatch(addStory(header, content));
    setHeader("");
    setContent("");

    const formData = new FormData();
    if (file) {
      setLoad(!load);
      formData.append("file", file);
      formData.append("header", header);
      try {
        axios.post(`http://localhost:5000/api/postphoto`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    window.location.replace("/");
  };

  return (
    <div className="addpostpage">
      <div style={{ display: "flex" }}>
        <label
          htmlFor="file"
          className="addpostpage__upload"
          style={{ padding: "14px" }}
        >
          <AiOutlinePlus className="addpostpage__uploadplus" size={30} />
        </label>
        <input
          type="file"
          accept=".jpg, .png"
          id="file"
          name="uploaded_file"
          style={{ display: "none" }}
          onChange={(e) => {
            selectFile(e);
          }}
        />

        <div className="addpostpage__storyinput">
          <div className="addpostpage__container">
            <input
              type="text"
              className="addpostpage__header"
              placeholder="Заголовок поста"
              autoFocus={true}
              value={header}
              onChange={(e) => {
                setHeader(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="addpostpage__image">
        {myFile && (
          <Image
            className="addpostpage__img"
            src={URL.createObjectURL(myFile)}
          />
        )}
      </div>
      <div className="addpostpage__storytextarea">
        <div className="addpostpage__container">
          <textarea
            className="addpostpage__content"
            placeholder="Поделитесь своей историей ..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <div className="addpostpage__submit sectiongray">
        <div
          className="addpostpage__addpost addpost"
          onClick={() => publish(header, content, myFile)}
        >
          Опубликовать
        </div>
        {error!==null && <span style={{fontSize: "12px", fontWeight:"bold", color:"red"}}>{error}</span>}
      </div>
    </div>
  );
};

export default AddPostPage;
