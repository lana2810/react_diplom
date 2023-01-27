// @ts-nocheck
import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Popup.module.css";

function Popup() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className={style.popup}>
      <p className={style.text}>Спасибо за заказ!</p>
      <button type="button" className="btn btn-primary" onClick={handleClick}>
        OK
      </button>
    </div>
  );
}

export default Popup;
