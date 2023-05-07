import React, { useState } from "react";
import "../user/signup.scss";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  login_register_loadUser_Start,
  login_register_loadUser_success,
  login_register_failure,
} from "../../Redux/features/userSlice.js";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(login_register_loadUser_Start());
    const url = "https://e-com-api-pgag.onrender.com/api/v1/user/signup";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const userData = await res.json();
    if (userData.success === false) {
      dispatch(login_register_failure(userData.message));
    } else {
      setUser({
        name: "",
        email: "",
        password: "",
      });
      dispatch(login_register_loadUser_success(userData));
      navigate("/login")
    }
  };

  const handleRegisterDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <h2>Create an account</h2>
        <form className="form" onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              placeholder="Name"
              onChange={handleRegisterDataChange}
              name="name"
              value={name}
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={handleRegisterDataChange}
              name="email"
              value={email}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="input-field"
              onChange={handleRegisterDataChange}
            />
            <input className="btn" type="submit" value="signup" />
          </div>
        </form>
        <span>
          already have an account?
          <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
