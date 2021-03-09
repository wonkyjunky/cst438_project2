import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
  } from "react-router-dom"
  import Nav from './NavBar'
 
  
    function wishlist() {
      return (
        <div className="wishlist">
             <Nav />
          <header>
          </header>
          <h1>Welcome to your wishlist</h1>
            <div id="login">
              <h2>Test</h2>
            </div>
        </div>
      );
    }
  
  
  
  export default wishlist;