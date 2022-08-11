import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStory } from "../actions/post";
import { AiOutlinePlus } from "react-icons/ai";

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
          onClick={() => {
            dispatch(addStory(header, content));
            setHeader("");
            setContent("");
          }}
        >
          Опубликовать
        </div>
      </div>
    </div>
  );
};

export default AddPostPage;
