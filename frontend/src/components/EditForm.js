import React, { useState } from "react";
import { connect } from "react-redux";
import { handleEditPost } from "../actions/post";
import { getUser } from "../utils/helpers";

const EditForm = (props) => {
  const { detail, dispatch } = props;
  const user = getUser();
  const [inputValue, setValue] = useState({
    title: detail.title,
    body: detail.body,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValue({ ...inputValue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleEditPost(inputValue, detail._id));
  };
  return (
    <div className="form-box">
      <h5>Edit your post</h5>
      <form onSubmit={handleSubmit}>
        <div className="field1">
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
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

function mapStateToProps(state, { detail }) {
  return {
    state,
    detail,
  };
}

export default connect(mapStateToProps)(EditForm);
