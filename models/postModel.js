const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
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
    category: {
      type: String,
      trim: true,
      required: true,
    },
    voteScore: { type: Number, default: 0 },
    supportVoters: [{ type: Schema.Types.ObjectId, ref: "User" }],
    opposeVoters: [{ type: Schema.Types.ObjectId, ref: "User" }],
    commentCount: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
