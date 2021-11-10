import { getPostsByID } from "../utils/api";

export const GET_POST_BY_ID = "GET_POST_BY_ID";

function getPostById(info) {
  return {
    type: GET_POST_BY_ID,
    info,
  };
}

export function handleGetPostByID(id) {
  return (dispatch) => {
    return getPostsByID(id)
      .then((data) => {
        dispatch(getPostById(data));
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
}