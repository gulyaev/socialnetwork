import React, { useEffect } from "react";
import "./css/App.css";
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  withRouter,
} from "react-router-dom";
import ProfileContainer from "./pages/profile/ProfileContainer";
import DialogsContainer from "./pages/dialogs/DialogsContainer";
import Main from "./pages/Main";
import UsersPageContainer from "./pages/users/UsersPageContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import LoginContainer from "./components/authform/login/LoginContainer";
import RegistrationContainer from "./components/authform/RegistrationContainer";
import UsersCardContainer from "./components/userscard/UsersCardContainer";
import UsersContainer from "./components/users/UsersContainer";

import { useSelector } from "react-redux";

const App = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <HeaderContainer />
        <div className="main">
          <section className="content">
            <Routes>
              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/profile/:id" element={<ProfileContainer />} />
              <Route path="/dialogs" element={<DialogsContainer />} />
              <Route path="/dialogs/:id" element={<DialogsContainer />} />
              <Route path="/users" element={<UsersPageContainer />} />
              <Route path="/login" element={<Main />} />
              <Route exact path="/" element={<Main />} />
            </Routes>
          </section>
          <aside className="sidebar">
            {!isAuth && (
              <div className="sidebar__form form">
                <Routes>
                  <Route
                    path="/registration"
                    element={<RegistrationContainer />}
                  />
                  <Route path="/login" element={<LoginContainer />} />
                  <Route exact path="/" element={<LoginContainer />} />
                </Routes>

                <div className="form__social social">
                  <div href="#" className="social__vk">
                    <img src={require("./img/social_vk.png")} alt="form__vk" />
                  </div>
                  <div href="" className="social__fb">
                    <img src={require("./img/social_vk.png")} alt="form__fb" />
                  </div>
                  <div href="" className="social__twitter">
                    <img
                      src={require("./img/social_vk.png")}
                      alt="form__twitter"
                    />
                  </div>
                  <div href="" className="social__gmail">
                    <img
                      src={require("./img/social_vk.png")}
                      alt="form__gmail"
                    />
                  </div>
                </div>
              </div>
            )}
            {isAuth && <UsersCardContainer />}

            <div className="sidebar__flex flex__center">
              <div className="sidebar__addpost">Добавить пост</div>
              <div className="sidebar__createpublic">Создать сообщество</div>
            </div>

            <div className="sidebar__flex menu">
              <div className="menu__item">
                <NavLink to="/profile" className="menu__navlink">
                  Профиль
                </NavLink>
              </div>
              <div className="menu__item active">
                <NavLink to="/dialogs" className="menu__navlink">
                  Сообщения
                </NavLink>
              </div>
            </div>
            {<UsersContainer />}
          </aside>
        </div>
        <div className="footer">
          <div className="footer__copy">Copy</div>
          <div className="footer__text">Text</div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
