import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
function Wishlist() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch("/api/test").then((res) =>
      res.json().then((data) => {
        setCurrentTime(data.time);
      })
    );
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <NavBar />
      <br></br>
      <br></br>
      <h2>My Wishlist</h2>
      <br></br>
      <div style={{ textAlign: "right" }} id="buttons">
        <button type="button">Create a new Wishlist</button> {"     "}
        <button type="button">Edit a wishlist</button>
      </div>
      <br></br>
      <br></br>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        id="wishlists"
      >
        <a href="/wishlistdetails">
          <figure
            style={{
              width: "320px",
              padding: "10px",
              border: "5px solid gray",
              flexBasis: "20%",
            }}
            id="wishlist"
          >
            <img
              src="https://cdn3.iconfinder.com/data/icons/christmas-and-new-year-13/64/Christmas_santa_bag-512.png"
              width="200"
            ></img>
            <figcaption id="wishlisttitle">My first Wishlist</figcaption>
          </figure>
        </a>
        <a href="/wishlistdetails">
          <figure
            style={{
              width: "320px",
              padding: "10px",
              border: "5px solid gray",
              flexBasis: "20%",
            }}
            id="wishlist"
          >
            <img
              src="https://cdn3.iconfinder.com/data/icons/christmas-and-new-year-13/64/Christmas_santa_bag-512.png"
              width="200"
            ></img>
            <figcaption id="wishlisttitle">My first Wishlist</figcaption>
          </figure>
        </a>
        <a href="/wishlistdetails">
          <figure
            style={{
              width: "320px",
              padding: "10px",
              border: "5px solid gray",
              flexBasis: "20%",
            }}
            id="wishlist"
          >
            <img
              src="https://cdn3.iconfinder.com/data/icons/christmas-and-new-year-13/64/Christmas_santa_bag-512.png"
              width="200"
            ></img>
            <figcaption id="wishlisttitle">My first Wishlist</figcaption>
          </figure>
        </a>
        <a href="/wishlistdetails">
          <figure
            style={{
              width: "320px",
              padding: "10px",
              border: "5px solid gray",
              flexBasis: "20%",
            }}
            id="wishlist"
          >
            <img
              src="https://cdn3.iconfinder.com/data/icons/christmas-and-new-year-13/64/Christmas_santa_bag-512.png"
              width="200"
            ></img>
            <figcaption id="wishlisttitle">My first Wishlist</figcaption>
          </figure>
        </a>
        <a href="/wishlistdetails">
          <figure
            style={{
              width: "320px",
              padding: "10px",
              border: "5px solid gray",
              flexBasis: "20%",
            }}
            id="wishlist"
          >
            <img
              src="https://cdn3.iconfinder.com/data/icons/christmas-and-new-year-13/64/Christmas_santa_bag-512.png"
              width="200"
            ></img>
            <figcaption id="wishlisttitle">My first Wishlist</figcaption>
          </figure>
        </a>
      </div>
    </div>
  );
}

export default Wishlist;
