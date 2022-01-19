import { Author, Message } from "../actions/author";

export default function authUser(state = {}, action) {
  switch (action.type) {
    case Author:
      return action.info;
    case Message:
      return action.info;
    default:
      return state;
  }
}
