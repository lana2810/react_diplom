import React, { useEffect, useState } from "react";
import API from "../api";
import ProductItem from "./ProductItem";
import Loader from "./Loader";

function Hits() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState("");

  useEffect(() => {
    API.getHits()
      .then((response) => response.json())
      .then((arr) => {
        setItems(arr);
        setLoading(false);
      })
      .catch((e) => {
        SetError(`Ошибка загрузки хитов продаж`);
      });
  }, []);

  return (
    <>
      {loading ? (
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          {error && <div style={{ fontSize: "22px" }}>{error}</div>}
          <Loader />
        </section>
      ) : (
        <>
          {items.length !== 0 ? (
            <section className="top-sales">
              <h2 className="text-center">Хиты продаж!</h2>
              <div className="row">
                {items.map((item) => (
                  <ProductItem key={item.id} {...item} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </>
  );
}

export default Hits;
