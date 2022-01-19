import React, { useState, useEffect } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Radio from "@mui/material/Radio";
import react from "../images/react.png";
import redux from "../images/redux.png";
import udacity from "../images/udacity.png";
import { getInitialPost, handleVoted, handleDeletePost } from "../actions/post";
import { handleInitialPost } from "../actions/shared";
import Posts from "./Posts";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { getUser } from "../utils/helpers";
import { setAuthor } from "../actions/author";

const img = [react, redux, udacity];

const Categories = (props) => {
  const { categories, posts, dispatch } = props;
  const user = getUser();
  console.log(user);
  const keys = Object.keys(categories);
  let keys2 = Object.keys(posts);
  const [check, setCheck] = useState("score");
  const history = useHistory();
  const location = useLocation();
  const handleChange = (e) => {
    setCheck(e.target.value);
  };

  useEffect(() => {
    if (location.pathname !== "/home") {
      dispatch(getInitialPost(location.pathname));
    } else {
      dispatch(handleInitialPost());
    }
  }, [location.pathname, dispatch]);

  const handleVote = (id, option) => {
    dispatch(handleVoted(id, option));
  };
  const handleDetailPage = (e, details, id, name) => {
    e.preventDefault();
    history.push(`/${name}/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(handleDeletePost(id));
  };

  const setUser = () => {
    document.cookie = "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    props.dispatch(setAuthor({}));
  };

  if (check === "score") {
    keys2.sort((a, b) => posts[b].voteScore - posts[a].voteScore);
  } else if (check === "date") {
    keys2.sort((a, b) => posts[b].timestamp - posts[a].timestamp);
  }
  return (
    <div className="container">
      <div className="bar">
        <h1>Categories</h1>
        <div className="tabs">
          <ul>
            <li>
              <Link to="/home">ALL</Link>
            </li>
            {keys.map((item) => (
              <li key={item}>
                <Link to={categories[item].name}>
                  {categories[item].name.toUpperCase()}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/profile">
                <img
                  src={user.imageUrl}
                  style={{ height: 50, width: 50, borderRadius: "50%" }}
                />
              </Link>
            </li>
            <li onClick={setUser}>
              <Link to="/">Log Out</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="post-container">
        <div className="top">
          <div>
            <span>Sort By</span>
            <Radio
              checked={check === "score"}
              onChange={handleChange}
              value="score"
              name="radio-buttons"
            />
            <span>Score</span>
            <Radio
              checked={check === "date"}
              onChange={handleChange}
              value="date"
              name="radio-buttons"
            />
            <span>Date</span>
          </div>
          <div>
            <Link to="/create_post">
              <span className="new-post">
                <AddBoxIcon />
                New Post
              </span>
            </Link>
          </div>
        </div>
        {keys2.length > 0 &&
          keys2.map((item) => (
            <div key={item} className="postcard">
              <Posts
                detail={posts[item]}
                handleVote={handleVote}
                handleDelete={handleDelete}
              />
              <div className="view">
                <button
                  className="viewBtn"
                  onClick={(e) =>
                    handleDetailPage(
                      e,
                      posts[item],
                      posts[item].id,
                      posts[item].category
                    )
                  }
                >
                  View more
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Categories);
