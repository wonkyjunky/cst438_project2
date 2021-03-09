import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom"
import Login from "./login";

  function home() {
    return (
      <div className="App">
        <header>
        </header>
        <h1>Welcome to the wishlist</h1>
          <div id="login">
            <h2>Please login in to continue</h2>
            <Link to="/login">Login</Link>
            
          </div>
      </div>
    );
  }



export default home;