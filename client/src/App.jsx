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
import HeaderContainer from "./components/header/HeaderContainer";
import LoginContainer from "./components/authform/login/LoginContainer";
import RegistrationContainer from "./components/authform/RegistrationContainer";
import UsersCardContainer from "./components/userscard/UsersCardContainer";
import UsersContainer from "./components/users/UsersContainer";
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
              <Routes>
                <Route path="/users" element={<UsersPageContainer />} />
                <Route path="/login" element={<MainPage />} />
                <Route exact path="/" element={<MainPage />} />
                <Route path="/add" element={<AddPostPage />} />
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

                  <div className="form__social social">
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
                  </div>
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
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
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
