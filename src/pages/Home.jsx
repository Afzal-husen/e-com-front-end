import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout_user } from "../Redux/features/userSlice.js";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((store) => store.userAuth);
  console.log(userData);

  const handleLogout = async () => {
    const url = "https://e-com-api-pgag.onrender.com/api/v1/user/logout";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
