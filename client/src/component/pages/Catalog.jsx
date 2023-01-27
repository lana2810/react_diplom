// @ts-nocheck
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsRequest } from "../../redux/itemsSlice";
import { removeIsLoaded } from "../../api/localStorage.service";
import FormSearch from "component/FormSearch";
import Categories from "../Categories";
import Loader from "../Loader";
import ProductItem from "../ProductItem";
import ButtonLoading from "../ButtonLoading";

function Catalog() {
  const { items, loading } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(itemsRequest());
    return () => {
      removeIsLoaded();
    };
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>
          <Loader />
        </section>
      ) : (
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>
          <FormSearch currentClass="catalog-search-form form-inline" />
          <Categories />
          {items.length === 0 ? (
            <h3>Список пуст</h3>
          ) : (
            <div className="row">
              {items.map((item) => (
                <ProductItem key={item.id} {...item} />
              ))}
            </div>
          )}
          <ButtonLoading />
        </section>
      )}
    </>
  );
}

export default Catalog;
