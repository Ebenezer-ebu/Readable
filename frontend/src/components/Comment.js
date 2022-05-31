import React, { useState } from "react";
import { connect } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { formatDate, getUser } from "../utils/helpers";
import { handleEditComment } from "../actions/comments";

const Comment = (props) => {
  const { comment, handleCommentVotes, deleteComment, dispatch } = props;
  const user = getUser();
  const [info, setInfo] = useState({
    body: comment.body,
  });
  const [form, showForm] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleEditComment(info, comment._id));
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
        <p>{formatDate(comment.createdAt)}</p>
        <p>{comment.voteScore}</p>
        <div>
          <button onClick={() => handleCommentVotes(comment._id, "upVote")}>
            <ThumbUpAltIcon />
          </button>
          <button onClick={() => handleCommentVotes(comment._id, "downVote")}>
            <ThumbDownAltIcon />
          </button>
        </div>
        <div className="icon del">
          <button onClick={() => deleteComment(comment._id)}>
            <DeleteOutlineIcon />
          </button>
        </div>

        {form && (
          <div className="form-box">
            <h3>Edit Comment</h3>
            <form onSubmit={handleSubmit}>
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
