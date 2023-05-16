import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  login_register_loadUser_Start,
  resetToInitialState,
} from "../../Redux/features/userSlice";
import Loader from "../layout/Loader";

const VerifyToken = () => {
  const [token, setToken] = useState("");

  const { loading } = useSelector((store) => store.userAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVerify = async (e) => {
    e.preventDefault();
    dispatch(login_register_loadUser_Start());
    // const url =
    //   "https://e-com-api-pgag.onrender.com/api/v1/user/password/verify";
    // const url = "http://localhost:5000/api/v1/user/password/verify";
    const url =
      `${process.env.REACT_APP_DEV_URL}/user/password/verify` ||
      `${process.env.REACT_APP_PROD_URL}/user/password/verify`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      dispatch(resetToInitialState());
      setTimeout(() => {
        toast.error(`${data.message}`, {
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
      dispatch(resetToInitialState());
      navigate(`/password/reset/${data.resetToken}`);
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
              <form className="form" onSubmit={handleVerify}>
                <h2 className="form-title">Enter verificaton code</h2>
                <div className="input-container">
                  <input
                    className="input-field"
                    type="text"
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="verification code..."
                  />
                </div>
                <div
                  className="btn-container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}>
                  <input className="btn" type="submit" value="verify" />
                  <button onClick={() => navigate("/login")} className="btn">
                    Back
                  </button>
                </div>
              </form>
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

export default VerifyToken;
