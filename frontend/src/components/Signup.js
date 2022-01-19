import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleSignupUser } from "../actions/author";
import SuccessError from "./SuccessError";

const Signup = (props) => {
  const { dispatch } = props;
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    imageUrl: "",
  });
  const cloud = "https://api.cloudinary.com/v1_1/ifezulike/image/upload";
  console.log(process.env.REACT_APP_CLOUDINARY_URL);
  const handleChange = (e) => {
    const { value, name, files } = e.target;
    if (files) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "hbcyue9x");
      fetch(cloud, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((datas) => {
          console.log(datas);
          setInputValue({ ...inputValue, imageUrl: datas.secure_url });
        });
    }
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue);
    dispatch(handleSignupUser(inputValue));
    setInputValue({
      username: "",
      email: "",
      password: "",
      imageUrl: "",
    });
  };
  return (
    <div className="home">
      <SuccessError />
      <div className="create_post">
        <h1 id="head">Signup to gain access</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username:
              <input
                type="text"
                name="username"
                placeholder="Username..."
                value={inputValue.username}
                onChange={handleChange}
              />
            </label>
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
            <label>
              Add your image:
              <input
                type="file"
                accept="image/*"
                name="imageUrl"
                onChange={handleChange}
              />
            </label>
            <div className="form-btn">
              <div>
                <button type="submit" className="submit">
                  Register
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

export default connect()(Signup);
