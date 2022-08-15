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
  const [load, setLoad] = useState(false);
  const [myFile, setMyFile] = useState();

  let selectFile = (e) => {
    setMyFile(e.target.files[0]);
    setLoad(!load);
  };

  let publish = (header, content, file) => {
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
  };

  return (
    <div className="addpostpage">
      <div style={{ display: "flex" }}>
        <label
          htmlFor="file"
          className="addpostpage__upload"
          style={{ padding: "14px" }}
        >
          <AiOutlinePlus
            size={30}
            style={{
              color: "#75aa4b",
              border: "1px solid #75aa4b",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
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
      </div>
    </div>
  );
};

export default AddPostPage;
