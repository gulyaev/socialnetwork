import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStory } from "../actions/post";

const AddPostPage = () => {
  const dispatch = useDispatch();
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="addpostpage">
      <div className="addpostpage__storyinput">
        <div className="addpostpage__container">
          <input
            type="text"
            className="addpostpage__header"
            placeholder="text"
            value={header}
            onChange={(e) => {
              setHeader(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="addpostpage__storytextarea">
        <div className="addpostpage__container">
          <textarea
            className="addpostpage__content"
            placeholder="Введите текст"
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
          Отправить
        </div>
      </div>
    </div>
  );
};

export default AddPostPage;
