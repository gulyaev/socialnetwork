import React from "react";

const AddPostPage = () => {
  return (
    <div className="addpostpage">
      <div className="addpostpage__storyinput">
        <div className="addpostpage__container">
          <input
            type="text"
            className="addpostpage__header"
            placeholder="text"
          />
        </div>
      </div>
      <div className="addpostpage__storytextarea">
        <div className="addpostpage__container">
          <textarea
            className="addpostpage__content"
            placeholder="Введите текст"
          ></textarea>
        </div>
      </div>
      <div className="addpostpage__submit sectiongray">
        <div className="addpostpage__addpost addpost">Отправить</div>
      </div>
    </div>
  );
};

export default AddPostPage;
