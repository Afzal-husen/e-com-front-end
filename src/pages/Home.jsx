import React, { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/product/ProductCard.jsx";
import "../styles/Home.scss";
import NavBar from "../components/layout/NavBar.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);

  // fetch data
  useEffect(() => {
    const fetchProducts = async () => {
      const url =
        "https://e-com-api-pgag.onrender.com/api/v1/products/allproducts";

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "applicaton/json",
        },
      });

      const data = await res.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  return (
    <Fragment>
      <NavBar />
      <div className="home-container">
        <div className="home-wrapper">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
