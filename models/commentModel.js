const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    body: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: String,
      trim: true,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    voteScore: { type: Number, default: 0 },
    supportVoters: [{ type: Schema.Types.ObjectId, ref: "User" }],
    opposeVoters: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;