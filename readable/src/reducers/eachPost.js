import { GET_POST_BY_ID } from "../actions/eachPost";
import { DELETE_POST, EDIT_POST, VOTE } from "../actions/post";
import { POST_COMMENT, DELETE_COMMENT } from "../actions/comments";

export default function eachPost(state = {}, action) {
  switch (action.type) {
    case GET_POST_BY_ID:
      return {
        ...state,
        ...action.info,
      };
    case DELETE_POST:
      return {};
    case POST_COMMENT:
      return {
        ...state,
        commentCount: state.commentCount + 1,
      };
    case VOTE: {
      return action.info;
    }
    case EDIT_POST:
      return action.data 
    case DELETE_COMMENT:
      return {
        ...state,
        commentCount: state.commentCount - 1,
      };
    default:
      return state;
  }
}
