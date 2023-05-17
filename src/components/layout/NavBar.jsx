import React from "react";
import "../../styles/NavBar.scss";
import { FaSearch, FaCartArrowDown } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <div className="nav-title">E-commerce</div>
      <div className="search-container">
        <input type="text" />
        <FaSearch />
      </div>
      <div className="user-details">
        user
      </div>
      <div className="cart-container">
        <FaCartArrowDown
          style={{
            fontSize: "2rem",
            cursor: "pointer",
            color: "#ffa601"
          }}
        />
        <span>5</span>
      </div>
    </div>
  );
};

export default NavBar;
