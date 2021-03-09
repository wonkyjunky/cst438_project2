import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom"
import Login from "./login";
import "./home.css";
import Nav from "./NavBar";

  function home() {
    return (
      <div className="App">
        <header>
          <Nav/>
        </header>
        <h1 id="Welcome">Welcome to the wishlist</h1>
          <div id="login">
            <h2>Please login in to continue</h2>
            
            
          </div>
      </div>
    );
  }



export default home;