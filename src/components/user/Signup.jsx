import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  login_register_loadUser_Start,
  login_register_loadUser_success,
  resetToInitialState,
} from "../../Redux/features/userSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/Loader.jsx";
import { FaUserAlt } from "react-icons/fa";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passEl = useRef();
  const conPassEl = useRef();

  const { loading } = useSelector((store) => store.userAuth);

  const [passVisibility, setPassVisibility] = useState(false);
  const [conPassVisibility, setConPassVisibility] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = user;

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(login_register_loadUser_Start());
    const url = "https://e-com-api-pgag.onrender.com/api/v1/user/signup";
    // const url = "http://localhost:5000/api/v1/user/signup";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
      setUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      await swal("🎉sucess🎉", userData.message, "success");
      dispatch(login_register_loadUser_success(userData));
      navigate("/login");
    }
  };

  const handleRegisterDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordVisibility = (inpEl) => {
    if (inpEl === passEl) {
      if (!passVisibility) {
        inpEl.current.type = "text";
      } else {
        inpEl.current.type = "password";
      }
      setPassVisibility(!passVisibility);
    } else {
      if (!conPassVisibility) {
        inpEl.current.type = "text";
      } else {
        inpEl.current.type = "password";
      }
      setConPassVisibility(!conPassVisibility);
    }
  };
  return (
    <Fragment>
      {loading === true ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container">
            <div className="wrapper">
              <form className="form" onSubmit={handleRegister}>
                <h2 className="form-title">Create an account</h2>
                <FaUserAlt
                  style={{
                    border: "2px solid black",
                    padding: "0.5rem",
                    fontSize: "2rem",
                    borderRadius: "50%",
                  }}
                />
                <div className="input-container">
                  <label className="input-label">Name</label>
                  <span className="material-symbols-outlined">person</span>
                  <input
                    type="text"
                    placeholder="John Doe"
                    onChange={handleRegisterDataChange}
                    name="name"
                    value={name}
                    className="input-field"
                  />
                </div>
                <div className="input-container">
                  <label className="input-label">Email</label>
                  <span className="material-symbols-outlined">mail</span>
                  <input
                    ref={passEl}
                    type="email"
                    placeholder="johndoe@example.com"
                    onChange={handleRegisterDataChange}
                    name="email"
                    value={email}
                    className="input-field"
                  />
                </div>

                <div className="input-container">
                  <label className="input-label">Password</label>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => handlePasswordVisibility(passEl)}>
                    {passVisibility ? "visibility" : "visibility_off"}
                  </span>
                  <input
                    ref={passEl}
                    type="password"
                    placeholder="Password..."
                    name="password"
                    value={password}
                    className="input-field"
                    onChange={handleRegisterDataChange}
                  />
                </div>

                <div className="input-container">
                  <label className="input-label">Confirm Password</label>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => handlePasswordVisibility(conPassEl)}>
                    {conPassVisibility ? "visibility" : "visibility_off"}
                  </span>
                  <input
                    ref={conPassEl}
                    type="password"
                    placeholder="confirm Password..."
                    name="confirmPassword"
                    value={confirmPassword}
                    className="input-field"
                    onChange={handleRegisterDataChange}
                  />
                </div>

                <input className="btn" type="submit" value="signup" />
              </form>
              <span>
                already have an account?
                <Link to="/login">Login</Link>
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
      )}
    </Fragment>
  );
};

export default Signup;
