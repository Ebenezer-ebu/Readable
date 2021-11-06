import { getCategories, getAllPost } from "../utils/api";
import { allPost } from "./post";
import { receiveCategories } from "./categories";

export function handleInitialData() {
    return (dispatch) => {
        return getCategories()
          .then((data) => {
            dispatch(receiveCategories(data));
          })
          .catch((e) => {
            console.log("Error: ", e);
          });
    }
}

export function handleInitialPost() {
    return (dispatch) => {
        return getAllPost()
          .then((data) => {
            dispatch(allPost(data));
          })
          .catch((e) => {
            console.log("Error: ", e);
          });
    }
}