import React from "react";
import Link from "next/link";

import "./navbar.css";

const Navbar = () => {
  return (
      <header id="navbar" className="navbar">
        <Link href="/" className="logo">
          Netflix
        </Link>
        <div>
          <Link href="/Home" className="nav-btn">
            Home
          </Link>
          <Link href="/Movies" className="nav-btn">
            Movies
          </Link>
          <Link href="/TvSeries" className="nav-btn">
            Tv Series
          </Link>
          <Link href="/" className="nav-btn">
            My List
          </Link>
        </div>
        <div>
          <Link href="/" className="nav-btn">
            Search
          </Link>
          <Link href="/" className="nav-btn">
            UserButton
          </Link>
        </div>
      </header>

  );
};

export default Navbar;
