import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import home from "./home";
import login from "./login";
import "./index.css";
import NavBar from "./NavBar";
import Wishlist from "./Wishlist";
import CreateAccount from "./CreateAccount";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={home} />
      <Route path="/login" component={login} />
      <Route path="/Wishlist" component={Wishlist} />
      <Route path="/createaccount" component={CreateAccount} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
