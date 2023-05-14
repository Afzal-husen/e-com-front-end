import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout_user } from "../Redux/features/userSlice.js";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/layout/Loader.jsx";
import { login_register_loadUser_Start } from "../Redux/features/userSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData, loading } = useSelector((store) => store.userAuth);

  const handleLogout = async () => {
    dispatch(login_register_loadUser_Start())
    const url = "https://e-com-api-pgag.onrender.com/api/v1/user/logout";
    // const url = "http://localhost:5000/api/v1/user/logout";
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
    <Fragment>
      {loading === true ? (
        <Loader />
      ) : (
        <Fragment>
          {!userData ? (
            <Fragment>
              <h1>E-commerce Home Page</h1>
              <Link to={"/login"}>Login</Link>
            </Fragment>
          ) : (
            <h1>
              Welcome to E-commerce {userData.user.name}
              <button onClick={handleLogout}>logout</button>
            </h1>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
