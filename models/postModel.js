const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
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
    category: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    voteScore: Number,
    supportVoters: [Schema.Types.ObjectId],
    opposeVoters: [Schema.Types.ObjectId],
    commentCount: Number,
    comments: [Schema.Types.ObjectId],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

