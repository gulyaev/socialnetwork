import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { API_URL } from "../../config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateProfile, deleteProfile } from "../../actions/user";
import { Avatar, Image, Input } from "antd";
import { UserOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

function Settings(props) {
  const isAuth = props.stateAuth.isAuth;
  const userId = props.stateAuth.usersId;
  const avatarData = props.stateAuth.avatar;
  const currentNikname = props.stateAuth.nikname;
  const currentEmail = props.stateAuth.email;

  const [myAvatar, setMyAvatar] = useState();
  const [nikname, setNikname] = useState(currentNikname);
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    setNikname(currentNikname);
    setEmail(currentEmail);
  }, [currentNikname, currentEmail]);

  const dispatch = useDispatch();

  const avatarLogo = <Avatar size={55} icon={<UserOutlined />} />;

  const avatar = avatarData ? (
    <img src={`${API_URL}` + `${avatarData}`} alt="avatar" />
  ) : (
    avatarLogo
  );

  let selectAvatar = (e) => {
    setMyAvatar(e.target.files[0]);
  };

  let publish = (userId, email, password, file) => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      try {
        axios.post(`http://localhost:5000/api/avatar`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updateProfile(userId, email, password));
    setEmail("");
    setPassword("");
    window.location.reload();
  };

  const togglePassword = () => {    
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="settings">
      <div className="settings__title">
        <span className="settings__change">Изменить профиль</span>
        {/* <span
          className="settings__deleteaccount"
          onClick={() => dispatch(deleteProfile(userId))}
        >
          Удалить профиль
        </span> */}
      </div>
      <div className="settings__data">
        <div className="settings__profilepicture">
          <div className="settings__avatar">
            {myAvatar && (
              <Image
                className="settings__avatar"
                src={URL.createObjectURL(myAvatar)}
              />
            )}
            {isAuth ? avatar : avatarLogo}
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
            onChange={(e) => {
              selectAvatar(e);
            }}
          />
        </div>

        <label htmlFor="nikname">Никнейм</label>
        <input
          id="nikname"
          type="text"
          className="settings__nikname"
          placeholder={currentNikname}
          value={nikname}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="settings__email"
          placeholder={currentEmail}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

<label htmlFor="password">Пароль</label>
        <div style={{display:"flex"}}>
          <input
            id="password"
            type={passwordShown ? "text" : "password"}
            placeholder="сменить пароль"
            value={password}
            className="settings__password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div onClick={togglePassword} style={{padding:"5px 0 0 0", cursor:"pointer"}}>
          {passwordShown ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </div>
        </div>
        

        <div
          className="settings__uploadfoto"
          onClick={() => publish(userId, email, password, myAvatar)}
        >
          Сохранить
        </div>
      </div>
    </div>
  );
}

export default Settings;
