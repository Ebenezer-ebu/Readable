import React, { useState } from "react";
import { connect } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { formatDate } from "../utils/helpers";
import EditForm from "./EditForm";

const Posts = (props) => {
  const { detail, handleVote, handleDelete } = props;
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="card">
      <div className="post">
        <button className="edit" onClick={() => setShowForm(true)}>
          <EditIcon />
        </button>
        <h1>{detail.title}</h1>
        <p>{detail.body}</p>
        <p>
          Post by <strong>{detail.author}</strong>
        </p>
        <p>{formatDate(detail.timestamp)}</p>
        <p>{detail.commentCount} Comments</p>
        <div>{detail.voteScore} Votes</div>
        {showForm && (
          <div className="form">
            <EditForm detail={detail} />
            <button className="close" onClick={() => setShowForm(false)}>
              <CloseIcon /> Close
            </button>
          </div>
        )}
        <div className="group-btn">
          <button onClick={() => handleVote(detail.id, "upVote")}>
            <ThumbUpAltIcon />
          </button>
          <button onClick={() => handleVote(detail.id, "downVote")}>
            <ThumbDownAltIcon />
          </button>
        </div>
        <button className="del" onClick={() => handleDelete(detail.id)}>
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  );
};
function mapStateToProps(state, { detail, handleVote, handleDelete }) {
  return {
    state,
    detail,
    handleVote,
    handleDelete,
  };
}

export default connect(mapStateToProps)(Posts);
