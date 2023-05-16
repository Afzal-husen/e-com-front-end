import React, { Fragment } from "react";
import "../../styles/ProductCard.scss";

const ProductCard = ({ product }) => {
  const { images } = product;
  const image = images[0];
  return (
    <Fragment>
      <div className="product-container">
        <div className="product-wrapper">
          <div className="product-image">
            <img src={image.url} alt={product.name} />
          </div>
          <div className="product-detail">
            <p>{product.category}</p>
            <p>{product.name}</p>
            <p>$ {product.price}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
