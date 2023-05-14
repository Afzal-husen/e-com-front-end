import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  resetPassword_success,
  resetToInitialState,
} from "../../Redux/features/userSlice.js";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPwd = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://e-com-api-pgag.onrender.com/api/v1/user/password/forgot";
      // const url = "http://localhost:5000/api/v1/user/password/forgot";

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success === false) {
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
      } else {
        dispatch(resetPassword_success(data));
        await swal("🎉sucess🎉", data.message, "success");
        navigate("/password/verify")
        setTimeout(() => {
          dispatch(resetToInitialState());
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="wrapper">
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="form-title">Enter your email</h2>
            <div className="input-container">
              <label className="input-label">Email</label>
              <span class="material-symbols-outlined">mail</span>
              <input
                className="input-field"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@example.com"
              />
            </div>
            <div
              className="btn-container"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}>
              <input className="btn" type="submit" value="submit" />
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
  );
};

export default ForgotPwd;
