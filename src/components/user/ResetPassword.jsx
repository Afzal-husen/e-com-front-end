import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import {
  login_register_loadUser_Start,
  resetToInitialState,
} from "../../Redux/features/userSlice";
import Loader from "../layout/Loader";

const ResetPassword = () => {
  const params = useParams();
  const { token } = params;

  const { loading } = useSelector(store => store.userAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passEl = useRef();
  const conPassEl = useRef();

  const [passVisibility, setPassVisibility] = useState(false);
  const [conPassVisibility, setConPassVisibility] = useState(false);

  const [reset, setReset] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleReset = async (e) => {
    dispatch(login_register_loadUser_Start());
    e.preventDefault();
    const url = `https://e-com-api-pgag.onrender.com/api/v1/user/password/reset/${token}`;
    // const url = `http://localhost:5000/api/v1/user/password/reset/${token}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reset),
    });
    const data = await res.json();

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
      await swal("🎉sucess🎉", data.message, "success");
      dispatch(resetToInitialState());
      navigate("/login");
    }
  };

  const handleResetData = (e) => {
    //   setReset((prevValue) => {
    //     return {
    //       ...prevValue,
    //       password: e.target.value,
    //       confirmPassword: e.target.value
    //     }
    // })

    // ALTERNATIVE
    setReset({ ...reset, [e.target.name]: e.target.value });
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
              <form className="form" onSubmit={handleReset}>
                <h2 className="form-title">Create New Password</h2>
                <div className="input-container">
                  <label className="input-label">password</label>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => handlePasswordVisibility(passEl)}>
                    {passVisibility ? "visibility" : "visibility_off"}
                  </span>
                  <input
                    ref={passEl}
                    type="password"
                    onChange={handleResetData}
                    name="password"
                    placeholder="password..."
                    className="input-field"
                  />
                </div>
                <div className="input-container">
                  <label className="input-label">confirm password</label>
                  <span
                    class="material-symbols-outlined"
                    onClick={() => handlePasswordVisibility(conPassEl)}>
                    {conPassVisibility ? "visibility" : "visibility_off"}
                  </span>
                  <input
                    ref={conPassEl}
                    type="password"
                    onChange={handleResetData}
                    name="confirmPassword"
                    placeholder="confirm password..."
                    className="input-field"
                  />
                </div>
                <input className="btn" type="submit" value="Reset" />
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

export default ResetPassword;
