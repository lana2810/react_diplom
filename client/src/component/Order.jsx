// @ts-nocheck
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cartRemove } from "../redux/cartSlice";
import API from "api";
import Popup from "./Popup/Popup";

function Order() {
  const initialStateForm = {
    phone: "",
    address: "",
  };
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [form, setForm] = useState(initialStateForm);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const handleChangeCheck = () => {
    setToggle((prevState) => !prevState);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClickOrder = async () => {
    const res = await API.createOrder(form);
    if (res.ok) {
      setShowPopup(true);
      dispatch(cartRemove());
      setForm(initialStateForm);
    } else {
      setError(res.statusText);
    }
  };
  return (
    <section className="order">
      {showPopup && <Popup />}
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
        <form className="card-body">
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              required
              pattern="\+?[0-9\s\-\(\)]+"
              onChange={handleChange}
              className="form-control"
              name="phone"
              id="phone"
              placeholder="Ваш телефон"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              required
              onChange={handleChange}
              className="form-control"
              name="address"
              id="address"
              placeholder="Адрес доставки"
            />
          </div>
          <div className="form-group form-check">
            <input
              checked={toggle}
              onChange={handleChangeCheck}
              type="checkbox"
              className="form-check-input"
              id="agreement"
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button
            onClick={(e) => handleClickOrder(e)}
            type="submit"
            className="btn btn-outline-secondary"
            disabled={!toggle}
          >
            Оформить
          </button>
          {error && <div>{`Извините, что-то пошло не так - ${error}`}</div>}
        </form>
      </div>
    </section>
  );
}

export default Order;
