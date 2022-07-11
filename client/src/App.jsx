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
          sidebar
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
