import React from 'react'
import './css/App.css'
import { Button } from 'antd';

const App = () => {
  return (
    <div className="wrapper">
      <div className="header">
        <div className="header__body">
          <a href="#" className="header__logo">
            <img src={require('./img/logo.jpeg')} alt="logo" />
          </a>
          <nav className="header__menu">
            <ul className="header__list">
              <li><a href="" className="header__link">Пункт меню</a></li>
              <li><a href="" className="header__link">Пункт меню</a></li>
              <li><a href="" className="header__link">Пункт меню</a></li>
              <li><a href="" className="header__link">Пункт меню</a></li>
              <li><a href="" className="header__link">Пункт меню</a></li>
            </ul>
          </nav>
          <div className="header__burger"><span></span></div>
        </div>
      </div>
      <div className="main">
        <section className="content">
          content
        </section>
        <aside className="sidebar">
          <div className="sidebar__form form">
            <div className="form__flex make__flex">
              <div className="form__header">Авторизация</div>
              <div className="form__login">
                <input type="text" placeholder='login' />
              </div>
              <div className="form__password">
                <input type="text" placeholder='password' />
              </div>
              <div className="form__forget">Забыли пароль?</div>
              <div className="form__button">Войти</div>
              <div className="form__registration">Регистрация</div>
              <div className="form__or">
                <div className="form__section_or">
                  <span>или</span>
                </div>
              </div>
            </div>


            <div className="form__social social">
              <div href="#" className="social__vk">
                <img src={require('./img/social_vk.png')} alt="form__vk" />
              </div>
              <div href="" className="social__fb">
                <img src={require('./img/social_vk.png')} alt="form__fb" />
              </div>
              <div href="" className="social__twitter">
                <img src={require('./img/social_vk.png')} alt="form__twitter" />
              </div>
              <div href="" className="social__gmail">
                <img src={require('./img/social_vk.png')} alt="form__gmail" />
              </div>
            </div>
          </div>

          <div className="make__flex">
            <div className="sidebar__addpost">Добавить пост</div>
            <div className="sidebar__createpublic">Создать сообщество</div>
          </div>
        </aside>
      </div>
      <div className="footer">
        <div className="footer__copy">Copy</div>
        <div className="footer__text">Text</div>
      </div>
    </div>
  );
}

export default App;
