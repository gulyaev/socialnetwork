import React, { useEffect, Suspense, lazy } from "react";
import "./css/App.css";
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  withRouter,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import AddPostPage from "./pages/AddPostPage";
import UsersPageContainer from "./pages/users/UsersPageContainer";
import SinglePostContainer from "./pages/SinglePostContainer";
import SettingsContainer from "./pages/settings/SettingsContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import LoginContainer from "./components/authform/login/LoginContainer";
import RegistrationContainer from "./components/authform/RegistrationContainer";
import ForgottenPassword from "./pages/forgottenpassword/ForgottenPassword";
import UsersCardContainer from "./components/userscard/UsersCardContainer";
import UsersContainer from "./components/users/UsersContainer";
import CategoriesContainer from "./components/categories/CategoriesContainer";
import LoaderLarge from "./components/LoaderLarge";
import axios from "axios";
import { setLoginDataActionCreator } from "./redux/authReducer";
import { initializeAppThunkCreator } from "./redux/appReducer";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { withMyRouter } from "./hoc/withMyRouter";
import { compose } from "redux";
const DialogsContainer = lazy(() => import("./pages/dialogs/DialogsContainer"));
const ProfileContainer = lazy(() => import("./pages/profile/ProfileContainer"));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();  
  }

  componentDidUpdate() {
    if (this.props.message === "Аккаунт создан") {
          window.location.replace("/login");
        }
  }

  render = () => {
    if (!this.props.initialized) {
      return <LoaderLarge />;
    }
    return (
      <BrowserRouter>
        <div className="wrapper">
          <HeaderContainer />
          <div className="main">
            <section className="content">
              <Suspense fallback={<div>Загрузка...</div>}>
                <Routes>
                  <Route path="/profile" element={<ProfileContainer />} />
                  <Route path="/profile/:id" element={<ProfileContainer />} />
                  <Route path="/dialogs" element={<DialogsContainer />} />
                  <Route path="/dialogs/:id" element={<DialogsContainer />} />
                </Routes>
              </Suspense>
              {this.props.isAuth && (
                <Routes>
                  <Route path="/settings" element={<SettingsContainer />} />
                  <Route path="/add" element={<AddPostPage />} />
                </Routes>
              )}
              <Routes>
                <Route path="/users" element={<UsersPageContainer />} />
                <Route path="/login" element={<MainPage />} />
                <Route path="/post/:id" element={<SinglePostContainer />} />
                <Route exact path="/" element={<MainPage />} />
                <Route path="/forgottenpassword" element={<ForgottenPassword />} />
              </Routes>
            </section>
            <aside className="sidebar">
              {!this.props.isAuth && (
                <div className="sidebar__form form">
                  <Routes>
                    <Route
                      path="/registration"
                      element={<RegistrationContainer />}
                    />
                    <Route path="/login" element={<LoginContainer />} />
                    <Route exact path="/" element={<LoginContainer />} />
                  </Routes>

                  {/* <div className="form__social social">
                    <div href="#" className="social__vk">
                      <img
                        src={require("./img/social_vk.png")}
                        alt="form__vk"
                      />
                    </div>
                    <div href="" className="social__fb">
                      <img
                        src={require("./img/social_vk.png")}
                        alt="form__fb"
                      />
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
                  </div> */}

                </div>
              )}
              {this.props.isAuth && <UsersCardContainer />}

              <div className="sidebar__flex flex__center">
                <NavLink to="/add" className="menu__navlink">
                  <div className="sidebar__addpost addpost">Добавить пост</div>
                </NavLink>
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
              {<CategoriesContainer />}
            </aside>
          </div>
          <div className="footer">
            <div className="footer__copy">
              <p>Оставайся с нами на связи</p>
              <img src={require("./img/tgbanner.jpeg")} alt="telegrambanner" />
            </div>
            <div className="footer__text">
              <p>naglampe в социальных сетях</p>
              <div className="social">
                    <div href="#" className="social__viber">
                      <img
                        src={require("./img/viber.png")}
                        alt="viber"
                      />
                    </div>
                    <div href="" className="social__vk">
                      <img
                        src={require("./img/vk.png")}
                        alt="vk"
                      />
                    </div>
                    <div href="" className="social__tg">
                      <img
                        src={require("./img/tg.png")}
                        alt="telegram"
                      />
                    </div>
                  </div> 
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    message: state.auth.message,
    initialized: state.app.initialized,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    initializeApp: () => {
      dispatch(initializeAppThunkCreator());
    },
  };
};

export default compose(
  withMyRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
