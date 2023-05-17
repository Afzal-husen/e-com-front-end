import React, { Fragment, useRef, useState } from "react";
import "../../styles/form.global.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  login_register_loadUser_Start,
  login_register_loadUser_success,
  resetToInitialState,
} from "../../Redux/features/userSlice.js";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passEl = useRef();

  const { loading } = useSelector((store) => store.userAuth);

  const [loggedUser, setLoggedUser] = useState({
    email: "",
    password: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  const loggedEmail = loggedUser.email;
  const loggedPassword = loggedUser.password;

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login_register_loadUser_Start());
    const url = "https://e-com-api-pgag.onrender.com/api/v1/user/signin";
    // const url = "http://localhost:5000/api/v1/user/signin";

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
      dispatch(resetToInitialState());
      setTimeout(() => {
        toast.error(`${userData.message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 100);
    } else {
      setLoggedUser({
        email: "",
        password: "",
      });
      await swal("🎉sucess🎉", userData.message, "success");
      dispatch(login_register_loadUser_success(userData));
      navigate("/");
    }
  };

  const handleLoginDataChange = (e) => {
    setLoggedUser({ ...loggedUser, [e.target.name]: e.target.value });
  };

  const handlePasswordVisibility = () => {
    if (!isVisible) {
      passEl.current.type = "text";
    } else {
      passEl.current.type = "password";
    }
    setIsVisible(!isVisible);
  };
  return (
    <Fragment>
      <div className="container">
        <div className="wrapper">
          <form className="form" onSubmit={handleLogin}>
            <h2 className="form-title">Login</h2>
            <div className="input-container">
              <label className="input-label">Email:</label>
              <span className="material-symbols-outlined">mail</span>
              <input
                type="email"
                placeholder="johndoe@example.com"
                onChange={handleLoginDataChange}
                name="email"
                value={loggedEmail}
                className="input-field"
              />
            </div>

            <div className="input-container">
              <label className="input-label">Password</label>
              <span
                className="material-symbols-outlined"
                onClick={handlePasswordVisibility}>
                {isVisible ? "visibility" : "visibility_off"}{" "}
              </span>
              <input
                ref={passEl}
                type="password"
                placeholder="password..."
                onChange={handleLoginDataChange}
                name="password"
                value={loggedPassword}
                className="input-field"
              />
            </div>
            <input className="btn" type="submit" value="signin" />
          </form>
          <span>
            create a new account
            <Link to="/signup">Signup</Link>
          </span>
          <span>
            <Link to={"/password/forgot"}>forgot your password?</Link>
          </span>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Fragment>
  );
};

export default Login;
