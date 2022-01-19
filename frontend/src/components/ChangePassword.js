import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { handleChangePassword } from "../actions/author";
import SuccessError from "./SuccessError";

const ChangePassword = (props) => {
  const { dispatch } = props;
  const [inputValue, setInputValue] = useState({
    newPassword: "",
  });

  const { search } = useLocation();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const values = queryString.parse(search);
  console.log(values);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      handleChangePassword({
        newPassword: inputValue.newPassword,
        userId: values.id,
        token: values.token,
      })
    );
    setInputValue({ newPassword: "" });
  };
  return (
    <div className="home">
      <SuccessError />
      <div className="create_post">
        <h1 id="head">Change of Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              New Password:
              <input
                type="password"
                name="newPassword"
                placeholder="New Password..."
                value={inputValue.email}
                onChange={handleChange}
              />
            </label>
            <div className="form-btn">
              <div>
                <button type="submit" className="submit">
                  Change Password
                </button>
              </div>
              <div>
                <Link to="/login_page">Login</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect()(ChangePassword);
