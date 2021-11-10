import React, { useState } from "react";
import { connect } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { formatDate } from "../utils/helpers";
import { handleEditComment } from "../actions/comments";

const Comment = (props) => {
  const { comment, handleCommentVotes, deleteComment, dispatch } = props;
  const [info, setInfo] = useState({
    author: comment.author,
    body: comment.body,
  });
  const [form, showForm] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleEditComment(info, comment.id));
  };

  return (
    <div>
      <div className="context2">
        <div className="icon edit">
          <button onClick={() => showForm(true)}>
            <EditIcon />
          </button>
        </div>
        <p>{comment.author}</p>
        <p>{comment.body}</p>
        <p>{formatDate(comment.timestamp)}</p>
        <p>{comment.voteScore}</p>
        <div>
          <button onClick={() => handleCommentVotes(comment.id, "upVote")}>
            <ThumbUpAltIcon />
          </button>
          <button onClick={() => handleCommentVotes(comment.id, "downVote")}>
            <ThumbDownAltIcon />
          </button>
        </div>
        <div className="icon del">
          <button onClick={() => deleteComment(comment.id)}>
            <DeleteOutlineIcon />
          </button>
        </div>

        {form && (
          <div className="form-box">
            <h3>Edit Comment</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Author:
                <input
                  type="text"
                  placeholder="Author..."
                  name="author"
                  value={info.author}
                  onChange={handleChange}
                />
              </label>
              <label>
                Comment:
                <textarea
                  type="text"
                  placeholder="Your comment..."
                  name="body"
                  value={info.body}
                  onChange={handleChange}
                />
              </label>
              <button type="submit" className="comment_btn">
                Submit
              </button>
            </form>
            <div onClick={() => showForm(false)}>
              <CloseIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function mapStateToProps(
  state,
  { comment, handleCommentVotes, deleteComment }
) {
  return {
    state,
    comment,
    handleCommentVotes,
    deleteComment,
  };
}

export default connect(mapStateToProps)(Comment);
