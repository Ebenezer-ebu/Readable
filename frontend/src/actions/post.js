import {
  getPostByCategories,
  vote,
  post,
  deletePostByID,
  editPostByID,
} from "../utils/api";

export const RECEIVE_POST = "RECEIVE_POST";
export const ALL_POST = "ALL_POST";
export const VOTE = "VOTE";
export const POST = "POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";

function receivePost(info) {
  return {
    type: RECEIVE_POST,
    info,
  };
}

export function allPost(info) {
  return {
    type: ALL_POST,
    info,
  };
}

function voted(info) {
  return {
    type: VOTE,
    info,
  };
}

function posted(info) {
  return {
    type: POST,
    info,
  };
}

function deletePost(id) {
  return {
    type: DELETE_POST,
    id,
  };
}

function editPost(data) {
  return {
    type: EDIT_POST,
    data,
  };
}

export function getInitialPost(category) {
  return (dispatch) => {
    return getPostByCategories(category)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(receivePost(data.data));
      })
      .catch((e) => {
        console.log("Error: ", e);
        dispatch(receivePost({}));
      });
  };
}

export function handleVoted(id, option, voterId) {
  return (dispatch) => {
    return vote(id, option, voterId)
      .then((data) => {
        dispatch(voted(data));
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
}

export function handlePost(body) {
  return (dispatch) => {
    return post(body)
      .then((data) => {
        dispatch(posted(data));
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
}

export function handleDeletePost(id) {
  return (dispatch) => {
    dispatch(deletePost(id));
    return deletePostByID(id)
      .then()
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
}

export function handleEditPost(body, id) {
  return (dispatch) => {
    return editPostByID(body, id)
      .then((data) => {
        dispatch(editPost(data));
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
}
