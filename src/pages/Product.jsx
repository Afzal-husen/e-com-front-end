import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Product.scss"

const Product = () => {
  const id = useLocation().pathname.split("/")[2];

  const [product, setProduct] = useState([]);
  console.log(product);

  useEffect(() => {

    const fetchProduct = async () => {
      const url =
        `${process.env.REACT_APP_DEV_URL}/products/product/${id}` ||
        `${process.env.REACT_APP_PROD_URL}/products/product/${id}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "applicaton/json",
        },
      });

      const data = await res.json();
      setProduct(data.product);
    };
    fetchProduct();
  }, [id]);

  return (
    <Fragment>
      <div className="prod-container">
        <div className="prod-wrapper">
          <div className="prodImg-container">
            {product?.images?.map((image) => (
              <img src={image.url} alt={product.name} />
            ))}
          </div>
          <div className="prod-details">
            <p>{product.category}</p>
            <p>{product.name}</p>
            <p>Reviews {product.reviewscount}</p>
            <p>{product.description}</p>
            <p>$ {product.price}</p>
            <p>stock: {product.stocks}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;