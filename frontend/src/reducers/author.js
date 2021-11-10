import { Author } from "../actions/author";

export default function authUser(state = null, action) {
    switch (action.type) {
        case Author:
            return action.name;
        default:
            return state;
    }
}