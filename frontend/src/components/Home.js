import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div>
        <h1 id="head">Welcome to Readable</h1>
      </div>
      <div className="signup-Login">
        <Link to="signup_page">
          <button className="signup">Sign Up</button>
        </Link>
        <Link to="login_page">
          <button className="login">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
