import React, { Fragment } from "react";
import "../../styles/NavBar.scss";
import {
  FaSearch,
  FaCartArrowDown,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login_register_loadUser_Start,
  logout_user,
} from "../../Redux/features/userSlice.js";

const NavBar = () => {
  const { isAuthenticated, userData } = useSelector((store) => store.userAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(login_register_loadUser_Start());
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
    <div className="navbar-container">
      <div className="nav-title">E-commerce</div>
      <div className="search-container">
        <input type="text" placeholder="search..." />
        <FaSearch />
      </div>
      <div className="details">
        <div className="user-details">
          {isAuthenticated ? (
            <Fragment>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "1px solid black",
                  padding: "0.4rem",
                  borderRadius: "0.2rem",
                }}>
                {userData.user.name}
                <FaUserAlt />
              </span>
              <button className="log-btn" onClick={handleLogout}>
                Logout
                <FaSignOutAlt />
              </button>
            </Fragment>
          ) : (
            <button className="log-btn" onClick={() => navigate("/login")}>
              Login
              <FaSignInAlt />
            </button>
          )}
        </div>
        <div className="cart-container">
          <FaCartArrowDown
            style={{
              fontSize: "2rem",
              cursor: "pointer",
              color: "#ffa601",
            }}
          />
          <span>5</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
