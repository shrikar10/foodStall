import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className="left-section">
          <a href="/">Users</a>
          <a href="/orders">Orders</a>
        </li>
        <li className="right-section">
          <a href="/signup">Signup</a>
          <a href="/login">Login</a>
          <span className="space"></span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
