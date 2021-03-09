import logo from './logo.svg';
import './App.css';
import Home from './home'
import Login from './login'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom"
import { render } from 'react-dom/cjs/react-dom.development'
import NavBar from './NavBar'
//This is a default App template;


function App() {
  return(
    <div className="App">
    <Router>
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
        </Switch>

    </Router>
    </div>
  );
   
  }



export default App;
