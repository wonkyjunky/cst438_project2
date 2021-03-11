import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
function Wishlist() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json().then(data => {
      setCurrentTime(data.time);
    }))
  },[])
  return (
    <div style={{ textAlign: "center" }}>
      <NavBar/>
      <br></br>
      <br></br>
      <h3>This is wishlist</h3>
      <h3>Message from server : {currentTime}</h3>
    </div>
  );
}

export default Wishlist;

