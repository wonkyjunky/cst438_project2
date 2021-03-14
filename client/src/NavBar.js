import React, { Component } from "react";
import "./Nav.css";
import App from "./App";
import login from "./login";
import CreateAccount from "./CreateAccount";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function NavBar() {
  return (
    <header>
      <nav className="Nav">
        <span className="Nav_title" style={{ fontSize: "200%" }}>
          WishList
        </span>
        <div className="Navi">
          <Link to="/" className="Navs">
            Home
          </Link>
          {"  "}
          &nbsp;
          <Link to="/itemlists" className="Navs">
            Recommendation
          </Link>
          {"  "}
          &nbsp;
          <Link to="/wishlist" className="Navs">
            My List
          </Link>
          {"  "}
          &nbsp;
          <Link to="/login" className="Navs">
            Login
          </Link>
          {"  "}
          &nbsp;
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
