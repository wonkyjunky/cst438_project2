import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./NavBar";

function login() {
  return (
    <div>
      <header style={{ textAlign: "center" }}>
        <NavBar />
        <br />
        <br />
        <h2>Login</h2>
        <body>
          <br />
          <br />
          <form>
            <input
              type="text"
              className="username"
              placeholder="Username"
            ></input>
            <br />
            <br />
            <input
              type="text"
              className="password"
              placeholder="password"
            ></input>
            <br /> <br />
            <button type="button" className="btn">
              Login
            </button>
          </form>
          <br></br>
          <Link to="/createaccount">Create Account</Link>
        </body>
      </header>
    </div>
  );
}

export default login;
