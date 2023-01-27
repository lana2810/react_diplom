import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ id, images, title, price }) {
  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <div style={{ height: "60%" }}>
          <img src={images[0]} className="card-img-top img-fluid" alt={title} />
        </div>
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price} руб.</p>
          <Link to={`/catalog/${id}`} className="btn btn-outline-primary">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
