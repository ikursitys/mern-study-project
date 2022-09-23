import React from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    navigate("/");
  };

  return (
    <nav>
      <div class="nav-wrapper indigo lighten-1">
        <a href="/" className="brand-logo">
          Сокращение ссылок
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Создать</NavLink>
          </li>
          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
