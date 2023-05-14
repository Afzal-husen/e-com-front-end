import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout_user } from "../Redux/features/userSlice.js";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((store) => store.userAuth);

  const cookie = document.cookie

  useEffect(() => {
    if(!cookie) {
      dispatch(logout_user());
    } 
  })



  const handleLogout = async () => {
    // const url = "https://e-com-api-pgag.onrender.com/api/v1/user/logout";
    const url = "http://localhost:5000/api/v1/user/logout";
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const data = await res.json()
    console.log(data)
    dispatch(logout_user());
    navigate("/login");
  };

  return (
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
  );
};

export default Home;
