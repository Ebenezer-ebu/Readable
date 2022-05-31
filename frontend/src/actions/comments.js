import {
  getCommentByParent,
  voteComment,
  postComment,
  deleteCommentByID,
  editCommentByID,
} from "../utils/api";

export const PARENT_COMMENT = "PARENT_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";
export const POST_COMMENT = "POST_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";

function parentComment(data) {
  return {
    type: PARENT_COMMENT,
    data,
  };
}

function voted(info) {
  return {
    type: VOTE_COMMENT,
    info,
  };
}

function postedComment(info) {
  return {
    type: POST_COMMENT,
    info,
  };
}

function commentDelete(id) {
  return {
    type: DELETE_COMMENT,
    id,
  };
}

function editComment(data) {
  return {
    type: EDIT_COMMENT,
    data,
  };
}

export function handleParentComment(id) {
  return (dispatch) => {
    return getCommentByParent(id)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        } else {
          dispatch(parentComment(data.data));
        }
      })
      .catch((e) => {
        dispatch(parentComment({}));
        console.log("Error: ", e);
      });
  };
}

export function handleVotedComment(id, option) {
  return (dispatch) => {
    return voteComment(id, option)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(voted(data.data));
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
}

export function handlePostComment(info) {
  return (dispatch) => {
    return postComment(info)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(postedComment(data.data));
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
}

export function handleDeleteComment(id) {
  return (dispatch) => {
    dispatch(commentDelete(id));
    return deleteCommentByID(id)
      .then()
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
}

export function handleEditComment(body, id) {
  return (dispatch) => {
    return editCommentByID(body, id)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(editComment(data.data));
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
}
