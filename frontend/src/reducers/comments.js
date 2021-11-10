import {
  PARENT_COMMENT,
  VOTE_COMMENT,
  POST_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from "../actions/comments";
import { DELETE_POST } from "../actions/post";

export default function comment(state = {}, action) {
  switch (action.type) {
    case PARENT_COMMENT:
      return {
        ...state,
        ...action.data,
      };
    case VOTE_COMMENT:
      const keys = Object.keys(state);
      let result = keys.map((item) => {
        if (state[item].id === action.info.id) {
          return action.info;
        }
        return state[item];
      });
      return {
        ...result,
      };
    case POST_COMMENT:
      const keys2 = Object.keys(state);
      state[keys2.length] = action.info;
      return {
        ...state,
      };
    case DELETE_POST:
      console.log(action, state)
      const allowed = Object.keys(state).filter(
        (each) => state[each].parentId !== action.id
      );
      console.log(allowed)
      const filtered = Object.keys(state)
        .filter((each) => allowed.includes(each))
        .reduce((obj, each) => {
          obj[each] = state[each];
          return obj;
        }, {});
      console.log(filtered);
      return filtered;
    case EDIT_COMMENT:
      const comEdit = Object.keys(state);
      let indx = comEdit.find((item) => state[item].id === action.data.id);
      return {
        ...state,
        [indx]: action.data,
      };
    case DELETE_COMMENT:
      const delCommentKeys = Object.keys(state);
      let delIndx = delCommentKeys.find((item) => state[item].id === action.id);
      const { [delIndx]: value, ...rest } = state;
      return rest;
    default:
      return state;
  }
}
