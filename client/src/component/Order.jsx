// @ts-nocheck
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cartRemove } from "../redux/cartSlice";
import API from "api";
import Popup from "./Popup/Popup";
import validateForm from "utils/validateForm";

function Order() {
  const initialStateForm = {
    phone: "",
    address: "",
  };
  const initialStateError = {
    phone: "",
    address: "",
  };
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [form, setForm] = useState(initialStateForm);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(initialStateError);

  const handleChangeCheck = () => {
    setToggle((prevState) => !prevState);
  };

  const handleChange = ({ target }) => {
    setError(initialStateError);
    const { name, value } = target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClickOrder = async (e) => {
    e.preventDefault();
    const err = validateForm(form);
    if (Object.keys(err).length !== 0) {
      setError(err);
      return;
    }
    const res = await API.createOrder(form);
    if (res.ok) {
      setShowPopup(true);
      dispatch(cartRemove());
      setForm(initialStateForm);
    } else {
      setError({
        errServer: `Извините, что то пошло не так - ${res.statusText}`,
      });
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
              onChange={handleChange}
              className={
                error.phone ? "form-control err_border" : "form-control"
              }
              name="phone"
              id="phone"
              placeholder="+7(000)000-00-00"
            />
            {error.phone && <div className="err">{error.phone}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              onChange={handleChange}
              className={
                error.address ? "form-control err_border" : "form-control"
              }
              name="address"
              id="address"
              placeholder="Адрес доставки"
            />
            {error.address && <div className="err">{error.address}</div>}
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
          {error.errServer && <div className="err">{error.errServer}</div>}
        </form>
      </div>
    </section>
  );
}

export default Order;
