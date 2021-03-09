import React from 'react'
import {Link} from 'react-router-dom'
import "./Nav.css";

function NavBar(){
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/Wishlist">Wishlist</Link></li>
        </ul>
    )
}

export default NavBar;