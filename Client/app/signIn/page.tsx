import React from "react";
import "./signIn.css";
import Link from "next/link";

const SignIn = () => {
  return (
    <div>
      <div className="main-wrapper">
        <div className="gradient">
          <header id="navbar" className="get-navbar">
            <div>
              <Link href="/" className="logo">
                {" "}
                Netflix
              </Link>
            </div>
          </header>
          <div className="sign-up-wrapper">
            <div className="sign-up">
              <form action="">
                <h1>Sign In</h1>
                <div className="input-boxes">
                  <input type="email" id="email" required />
                  <label className="floating-label" htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="input-boxes">
                <input type="password" id="password" required />
                <label className="floating-label" htmlFor="password">
                  Password
                </label>
              </div>
                <input type="submit" value="Sign in" />
              </form>
              <div className="remember-me">
                <input type="checkbox" />
                <label htmlFor="remember-me">Remember Me</label>
              </div>
              <p>New to Netflix ?</p>
              <Link href="/">Sign up Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
