// @ts-nocheck
import API from "api";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentCategory } from "../redux/itemsSlice";

function Categories() {
  const [categories, setCategories] = useState([
    {
      id: undefined,
      title: " Все",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState("");
  const dispatch = useDispatch();
  const { currentCategory, search } = useSelector((state) => state.items);

  useEffect(() => {
    API.getCategories()
      .then((response) => response.json())
      .then((arr) => {
        setCategories((prevState) => prevState.concat(arr));
        setLoading(false);
      })
      .catch((e) => {
        SetError(`Ошибка загрузки категорий товаров`);
      });
  }, []);

  const handleClick = (id) => {
    dispatch(setCurrentCategory({ currentCategory: id, q: search }));
  };

  const handleClass = (id) => {
    return id === currentCategory ? "nav-link active" : "nav-link";
  };

  return (
    <>
      {error && <div>{error}</div>}
      {!loading && (
        <ul className="catalog-categories nav justify-content-center">
          {categories.map((item) => (
            <li className="nav-item" key={item.id || 0}>
              <div
                className={handleClass(item.id)}
                onClick={() => handleClick(item.id)}
              >
                {item.title}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Categories;
