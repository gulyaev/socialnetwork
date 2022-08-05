import React from "react";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="header">
      <div className="header__body">
        <a href="#" className="header__logo">
          <img src={require("../../img/logo.jpeg")} alt="logo" />
        </a>
        <nav className="header__menu">
          <ul className="header__list">
            <li className="header__link">
              <NavLink to="/">Главная</NavLink>
            </li>
            <li>
              <a href="" className="header__link">
                Лучшее
              </a>
            </li>
            <li>
              <a href="" className="header__link">
                Горячее
              </a>
            </li>
            <li>
              <a href="" className="header__link">
                Свежее
              </a>
            </li>
            <li>
              <a href="" className="header__link">
                Подписки
              </a>
            </li>
            <li>
              <a href="" className="header__link">
                Сообщества
              </a>
            </li>
            <li>
              <a href="" className="header__link">
                Компании
              </a>
            </li>
          </ul>
        </nav>
        <div className="header__burger">
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Header;
