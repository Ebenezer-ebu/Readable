import { combineReducers } from "redux";
import categories from "./categories";
import authUser from "./author";
import posts from "./posts";
import comment from "./comments";
import eachPost from "./eachPost"

export default combineReducers({
  categories,
  authUser,
  posts,
  comment,
  eachPost,
});
