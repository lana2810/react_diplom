// @ts-nocheck
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeSearchField } from "../redux/itemsSlice";

function FormSearch({ currentClass }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search, currentCategory } = useSelector((state) => state.items);

  const handleChange = (event) => {
    navigate("/catalog");
    const { value } = event.target;
    dispatch(changeSearchField({ q: value, currentCategory }));
  };
  return (
    <form className={currentClass}>
      <input
        className="form-control"
        placeholder="Поиск"
        value={search}
        onChange={handleChange}
      />
    </form>
  );
}

export default FormSearch;
