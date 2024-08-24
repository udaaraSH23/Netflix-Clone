import React from "react";
import "./home.css";
import Link from "next/link";

import Navbar from "../Components/navbar";
import Card from "../Components/Card";

const Home = () => {
  return (
    <div>
      <div className="main-wrapper">
        <div className="main-gradient">
          <Navbar></Navbar>
          <div className="main-content">
            <div className="title">
              <h1>Money Heist</h1>
            </div>
            <div className="title-btn">
              <button>Play</button>
              <button>+ My List</button>
            </div>
            <div className="title-description">
              <h4>Watch Now</h4>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Tenetur ratione aspernatur quis, quos dolorem, beatae dolores
                labore a suscipit quae veritatis facilis optio animi et quisquam
                fugit porro ad reiciendis.
              </p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="card-section">
        <h2>Recently Watched</h2>
        <div className="slider">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
