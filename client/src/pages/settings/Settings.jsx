import React from "react";
import { FaUserCircle } from "react-icons/fa";

function Settings() {
  return (
    <div className="settings">
      <div className="settings__title">
        <span className="settings__change">Изменить профиль</span>
        <span className="settings__deleteaccount">Удалить профиль</span>
      </div>
      <div className="settings__data">
        <div className="settings__profilepicture">
          <div className="settings__avatar">
            <img src={require("../../img/logo.jpeg")} alt="avatar" />
          </div>
          <label htmlFor="file">
            <FaUserCircle
              size={30}
              style={{
                borderRadius: "50%",
                backgroundColor: "#75aa4b",
                color: "#fff",
              }}
            />
          </label>
          <input
            type="file"
            accept=".jpg"
            id="file"
            name="uploaded_file"
            style={{ display: "none" }}
          />
        </div>
        <label htmlFor="nikname">Никнейм</label>
        <input
          id="nikname"
          type="text"
          className="settings__nikname"
          placeholder="nikname1"
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="settings__email"
          placeholder="name1@mail.ru"
        />
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          className="settings__password"
          placeholder="name1"
        />
        <div className="settings__uploadfoto">Сохранить</div>
      </div>
    </div>
  );
}

export default Settings;
