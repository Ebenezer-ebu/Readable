import React, { useState } from "react";
import { connect } from "react-redux";
import { handleSendEmailForPasswordChange } from "../actions/author";
import { Link } from "react-router-dom";
import SuccessError from "./SuccessError";

const ApprovePasswordChange = (props) => {
  const { dispatch } = props;
  const [inputValue, setInputValue] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleSendEmailForPasswordChange(inputValue));
    setInputValue({ email: "" });
  };

  return (
    <div className="home">
      <SuccessError />
      <div className="create_post">
        <h1 id="head">Change of Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Email Address:
              <input
                type="email"
                name="email"
                placeholder="Your Email..."
                value={inputValue.email}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="submit">
              Confirm Password Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect()(ApprovePasswordChange);
