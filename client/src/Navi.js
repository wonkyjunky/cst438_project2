import React, { Component } from "react";
import "./Nav.css";
import App from "./App";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Navi extends Component {
  render() {
    return (
      <Router>
        <header>
          <nav className="Nav">
            <span className="Nav_title" style={{ fontSize: "200%" }}>
              WishList
            </span>
            <div className="Navi">
              <Link to="/home" className="Navs">
                Home
              </Link>
              <Link to="/mylist" className="Navs">
                My List
              </Link>
              <Link to="/login" className="Navs">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <Switch>
          <Route path="/home">
            <App />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/CreateAccount">
            <CreateAccount />
          </Route>
        </Switch>
      </Router>
    );
  }
}
