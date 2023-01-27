// @ts-nocheck
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "./Container";
import FormSearch from "component/FormSearch";

function Header() {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const [toggle, setToggle] = useState(false);
  const numItems = items.reduce((sum, item) => sum + item.count, 0);

  const handleClickSearch = () => {
    setToggle((prevState) => !prevState);
  };
  const handleClickCart = () => {
    navigate("/cart");
  };
  if (toggle) {
    setTimeout(() => {
      setToggle(false);
    }, 7000);
  }
  return (
    <header className="container">
      <Container>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <NavLink to="/" className="navbar-brand">
            <img src="/img/header-logo.png" alt="Bosa Noga" />
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Главная
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/catalog">
                  Каталог
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  О магазине
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contacts">
                  Контакты
                </NavLink>
              </li>
            </ul>
            <div>
              <div className="header-controls-pics">
                <div
                  data-id="search-expander"
                  className="header-controls-pic header-controls-search"
                  onClick={handleClickSearch}
                />
                <div
                  className="header-controls-pic header-controls-cart"
                  onClick={handleClickCart}
                >
                  {numItems !== 0 && (
                    <div className="header-controls-cart-full">{numItems}</div>
                  )}
                  <div className="header-controls-cart-menu" />
                </div>
              </div>
              <FormSearch
                currentClass={
                  toggle
                    ? "header-controls-search-form form-inline visible"
                    : "header-controls-search-form form-inline invisible"
                }
              />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
