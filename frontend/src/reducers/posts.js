import {
  RECEIVE_POST,
  ALL_POST,
  VOTE,
  POST,
  DELETE_POST,
  EDIT_POST,
} from "../actions/post";
import { POST_COMMENT } from "../actions/comments";

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST:
      return { ...action.info };
    case ALL_POST:
      return {
        ...state,
        ...action.info,
      };
    case VOTE:
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
    case POST:
      const keys2 = Object.keys(state);
      state[keys2.length] = action.info;
      return {
        ...state,
      };
    case POST_COMMENT:
      const res = Object.keys(state);
      let index = res.find((item) => state[item].id === action.info.parentId);
      return {
        ...state,
        [index]: {
          ...state[index],
          commentCount: state[index].commentCount + 1,
        },
      };
    case EDIT_POST:
      const postEdit = Object.keys(state);
      let indx = postEdit.find((item) => state[item].id === action.data.id);
      return {
        ...state,
        [indx]: action.data
      }
    case DELETE_POST:
      const delPostKeys = Object.keys(state);
      let delIndx = delPostKeys.find((item) => state[item].id === action.id);
      const { [delIndx]: value, ...rest } = state;
      return rest;
    default:
      return state;
  }
}
