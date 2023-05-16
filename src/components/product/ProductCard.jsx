import React, { Fragment } from "react";
import "../../styles/ProductCard.scss";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { images } = product;
  const image = images[0];
  return (
    <Fragment>
      <Link to={`/product/${product._id}`}>
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
      </Link>
    </Fragment>
  );
};

export default ProductCard;
