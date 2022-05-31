import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleLoginUser } from "../actions/author";
import SuccessError from "./SuccessError";

const Login = (props) => {
  const { dispatch, state, history } = props;
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLoginUser(inputValue));
  };

  if (state && state.authUser.userInDB) {
    history.push("/home");
  }

  return (
    <div className="home">
      <SuccessError />
      <div className="create_post">
        <h1 id="head">Login with the details you registered with</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                placeholder="Email Address..."
                value={inputValue.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                placeholder="Password..."
                value={inputValue.password}
                onChange={handleChange}
              />
            </label>
            <div className="form-btn">
              <div>
                <button type="submit" className="submit">
                  Login
                </button>
              </div>
              <div>
                <Link to="/approve_password_change">Change Password</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Login);
