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
      unique: true,
    },
    author: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    voteScore: Number,
    supportVoters: [Schema.Types.ObjectId],
    opposeVoters: [Schema.Types.ObjectId],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;