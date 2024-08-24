import React from 'react'
import './movies.css'

import Navbar from '../Components/navbar'

const Movies = () => {
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
    </div>
  )
}

export default Movies