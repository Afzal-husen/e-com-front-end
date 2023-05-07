import React, { useState } from "react";
import "../user/login.scss";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  login_register_loadUser_Start,
  login_register_loadUser_success,
  login_register_failure,
} from "../../Redux/features/userSlice.js";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [loggedUser, setLoggedUser] = useState({
    email: "",
    password: "",
  });

  const loggedEmail = loggedUser.email;
  const loggedPassword = loggedUser.password;
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login_register_loadUser_Start());
    const url = "http://localhost:5000/api/v1/user/signin";

    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loggedUser),
    });

    const userData = await res.json();

    if (userData.success === false) {
      dispatch(login_register_failure(userData.message));
    } else {
      setLoggedUser({
        email: "",
        password: "",
      });
      dispatch(login_register_loadUser_success(userData));
      navigate("/")
    }
  };

  const handleLoginDataChange = (e) => {
    setLoggedUser({ ...loggedUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h2>
            Login
        </h2>
        <form className="form" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={handleLoginDataChange}
              name="email"
              value={loggedEmail}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleLoginDataChange}
              name="password"
              value={loggedPassword}
              className="input-field"
            />
            <input className="btn" type="submit" value="signin" />
          </div>
        </form>
        <span>
          create a new account
          <Link to='/signup'>Signup</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
