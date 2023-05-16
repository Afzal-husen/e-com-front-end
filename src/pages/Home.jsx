import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout_user } from "../Redux/features/userSlice.js";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/layout/Loader.jsx";
import { login_register_loadUser_Start } from "../Redux/features/userSlice.js";
import ProductCard from "../components/product/ProductCard.jsx";
import "../styles/Home.scss"

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData, loading } = useSelector((store) => store.userAuth);

  const [products, setProducts] = useState([]);
  console.log(products);

  // fetch data
  useEffect(() => {
    const fetchProducts = async () => {
      const url =
        `${process.env.REACT_APP_DEV_URL}/products/allproducts` ||
        `${process.env.REACT_APP_PROD_URL}/products/allproducts`;

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

  const handleLogout = async () => {
    dispatch(login_register_loadUser_Start());
    // const url = "https://e-com-api-pgag.onrender.com/api/v1/user/logout";
    // const url = "http://localhost:5000/api/v1/user/logout";
    const url =
      `${process.env.REACT_APP_DEV_URL}/user/logout` ||
      `${process.env.REACT_APP_PROD_URL}/user/logout`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    await res.json();
    dispatch(logout_user());
    navigate("/login");
  };

  return (
    // <Fragment>
    //   {loading === true ? (
    //     <Loader />
    //   ) : (
    //     <Fragment>
    //       {!userData ? (
    //         <Fragment>
    //             <Link to={"/login"}>Login</Link>
    //         </Fragment>
    //       ) : (
    //         <h1>
    //           Welcome to E-commerce {userData.user.name}
    //           <button onClick={handleLogout}>logout</button>
    //         </h1>
    //       )}
    //     </Fragment>
    //   )}
    // </Fragment>
    <Fragment>
      {loading === true ? <Loader /> : (
        <Fragment>
          <div className="home-container">
            <div className="home-wrapper">
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </Fragment>
      )}
      <button onClick={handleLogout}>logout</button>
    </Fragment>
  );
};

export default Home;
