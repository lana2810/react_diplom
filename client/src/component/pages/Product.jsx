// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { itemsAdd } from "../../redux/cartSlice";
import API from "api";
import Loader from "component/Loader";

function Product() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [product, SetProduct] = useState({});
  const [size, setSize] = useState(undefined);
  const [count, setCount] = useState(1);

  useEffect(() => {
    API.getItemById(id).then((response) => {
      SetProduct(response);
      setLoading(false);
    });
  }, [id]);
  const {
    title,
    images,
    sku,
    manufacturer,
    color,
    material,
    season,
    reason,
    sizes,
    price,
  } = product;

  const handleClick = (item) => {
    setSize((prevState) => (prevState === item ? undefined : item));
  };
  const handleClickAdd = () => {
    setCount((prevState) => (prevState === 10 ? 10 : prevState + 1));
  };
  const handleClickDelete = () => {
    setCount((prevState) => (prevState === 1 ? 1 : prevState - 1));
  };
  const handleClickCart = () => {
    dispatch(itemsAdd({ id, title, size, count, price }));
    navigate("/cart");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="catalog-item">
          <h2 className="text-center">{title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={images[0]} alt={title} className="img-fluid" />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{reason}</td>
                  </tr>
                  <tr>
                    <td>Цена</td>
                    <td>{price}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:
                  {sizes
                    .filter((it) => it.avalible)
                    .map((it, index) => (
                      <span
                        key={index}
                        className={
                          it.size === size
                            ? "catalog-item-size selected"
                            : "catalog-item-size "
                        }
                        onClick={() => handleClick(it.size)}
                      >
                        {it.size}
                      </span>
                    ))}
                </p>
                <p>
                  Количество:
                  <span className="btn-group btn-group-sm pl-2">
                    <button
                      onClick={handleClickDelete}
                      className="btn btn-secondary"
                    >
                      -
                    </button>
                    <span className="btn btn-outline-primary">{count}</span>
                    <button
                      onClick={handleClickAdd}
                      className="btn btn-secondary"
                    >
                      +
                    </button>
                  </span>
                </p>
              </div>
              <button
                onClick={handleClickCart}
                disabled={size ? false : true}
                className="btn btn-danger btn-block btn-lg"
              >
                В корзину
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Product;
