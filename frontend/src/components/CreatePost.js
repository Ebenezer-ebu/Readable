import React, { useState } from "react";
import { connect } from "react-redux";
import { timestamp, uniqueId, formatPost, getUser } from "../utils/helpers";
import { handlePost } from "../actions/post";

const CreatePost = (props) => {
  const { dispatch } = props;
  const user = getUser();
  const [inputValue, setValue] = useState({
    title: "",
    author: "",
    body: "",
    category: "react",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValue({ ...inputValue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let post = formatPost(inputValue, user.username, user.userId);
    dispatch(handlePost(post));
    props.history.push("/home");
  };
  return (
    <div className="create_post">
      <h1>Create A Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Post title:
            <input
              type="text"
              name="title"
              placeholder="Title..."
              value={inputValue.title}
              onChange={handleChange}
            />
          </label>
          <label>
            What's on your mind:
            <textarea
              type="text"
              name="body"
              placeholder="Make a post here..."
              value={inputValue.body}
              onChange={handleChange}
            />
          </label>
          <label>
            Select category:
            <select
              value={inputValue.category}
              name="category"
              onChange={handleChange}
            >
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default connect()(CreatePost);
