import "./Nav.css";
import NavBar from "./NavBar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import home from "./home";
import login from "./login";
import Wishlist from "./Wishlist";
import CreateAccount from "./CreateAccount";

function App() {
  return (
    <div className="App" style={{ textAlign: "center" }}>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/login" component={login} />
            <Route exact path="/wishlist" component={Wishlist} />
            <Route exact path="/createaccount" component={CreateAccount} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
