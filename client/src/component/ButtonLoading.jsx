// @ts-nocheck
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsRequest } from "../redux/itemsSlice";
import { getIsLoaded } from "../api/localStorage.service";

function ButtonLoading() {
  const dispatch = useDispatch();
  const { items, currentCategory, search } = useSelector(
    (state) => state.items
  );
  const isLoaded = getIsLoaded();

  const handleClick = () => {
    dispatch(itemsRequest({ currentCategory, from: items.length, q: search }));
  };

  return (
    <>
      {!isLoaded && (
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={handleClick}>
            Загрузить ещё
          </button>
        </div>
      )}
    </>
  );
}

export default ButtonLoading;
