import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from "./home";
import Login from "./login";
import WishList from "./Wishlist";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  BrowserRouter
} from "react-router-dom"

ReactDOM.render(
<BrowserRouter>
  <Switch>
      <Route exact path ="/" component={Home}/>
      <Route path ="/login" component={Login}/>
      <Route path="/Wishlist" component={WishList}/>
  </Switch>
</BrowserRouter>
  ,
  
  document.getElementById('root')
);


  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

