/* eslint-disable jsx-a11y/scope */
// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { itemsRemoveItem } from "../redux/cartSlice";

function CartTable() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const sum = items
    .map((item) => item.count * item.price)
    .reduce((acc, item) => acc + item, 0);
  const handleDelete = (id, size) => {
    dispatch(itemsRemoveItem({ id, size }));
  };
  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td scope="row">{index + 1}</td>
              <td>
                <Link to={`/catalog/${item.id}`}>{item.title}</Link>
              </td>
              <td>{item.size}</td>
              <td>{item.count}</td>
              <td>{item.price} руб.</td>
              <td>{(item.price * item.count).toFixed(2)} руб.</td>
              <td>
                <button
                  onClick={() => handleDelete(item.id, item.size)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5" className="text-right">
              Общая стоимость
            </td>
            <td>{sum} руб.</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default CartTable;
