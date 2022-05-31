import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import Deleted from "./NoticeDelete";
import Comment from "./Comment";
import EditForm from "./EditForm";
import { handleVoted, handleDeletePost } from "../actions/post";
import { handleGetPostByID } from "../actions/eachPost";
import {
  handleParentComment,
  handleVotedComment,
  handlePostComment,
  handleDeleteComment,
} from "../actions/comments";
import { formatDate, formatPostComment, getUser } from "../utils/helpers";

const DetailPage = (props) => {
  const [info, setInfo] = useState({
    body: "",
  });
  const [showForm, setShowForm] = useState(false);
  const { dispatch, match } = props;
  const { comment, eachPost } = props.state;
  const user = getUser();
  const keys2 = Object.keys(comment);
  let detail = eachPost;
  const handleVote = (id, option) => {
    dispatch(handleVoted(id, option, user.userId));
  };

  const handleCommentVotes = (id, option) => {
    dispatch(handleVotedComment(id, option));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = formatPostComment(
      info,
      user.username,
      user.userId,
      match.params.post_id
    );
    dispatch(handlePostComment(result));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInfo({ ...info, [name]: value });
  };

  const handleDelete = (id) => {
    dispatch(handleDeletePost(id));
  };

  const deleteComment = (id) => {
    dispatch(handleDeleteComment(id));
  };

  useEffect(() => {
    const { params } = match;
    dispatch(handleParentComment(params.post_id));
    dispatch(handleGetPostByID(params.post_id));
  }, [match.params.post_id, dispatch]);

  if (!detail._id) {
    return <Deleted />;
  }

  return (
    <div className="container">
      <div className="content">
        <div className="context">
          <h1>{detail.title}</h1>
          <div className="icon edit">
            <button onClick={() => setShowForm(true)}>
              <EditIcon />
            </button>
          </div>
          <p>{detail.body}</p>
          <p>Post by {detail.author}</p>
          <p>{formatDate(detail.createdAt)}</p>
          <p>{detail.commentCount} Comments</p>
          <div>{detail.voteScore} Votes</div>

          <div className="icon">
            <button onClick={() => handleVote(detail._id, "upVote")}>
              <ThumbUpAltIcon />
            </button>
            <button onClick={() => handleVote(detail._id, "downVote")}>
              <ThumbDownAltIcon />
            </button>
          </div>
          <div className="icon del">
            <button onClick={() => handleDelete(detail.id)}>
              <DeleteOutlineIcon />
            </button>
          </div>
        </div>
        {showForm && (
          <div className="form">
            <EditForm detail={detail} />
            <div onClick={() => setShowForm(false)}>
              <CloseIcon />
            </div>
          </div>
        )}
        <div>
          <div className="comment">
            {keys2.map((item) => (
              <div key={item}>
                <Comment
                  comment={comment[item]}
                  handleCommentVotes={handleCommentVotes}
                  deleteComment={deleteComment}
                />
              </div>
            ))}
          </div>
          <div className="comment_flex">
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
              <input type="submit" className="btn" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(DetailPage);
