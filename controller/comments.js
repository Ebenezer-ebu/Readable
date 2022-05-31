const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const { commentBody } = require("../utils/validate");
const { votes } = require("../utils/helpers");

const addComment = async (req, res) => {
  const { parentId, body, author, authorId } = req.body;
  try {
    const verify = commentBody.validate({ body });
    if (verify.error) {
      let error = verify.error.details[0].message.replace(/[\"]/g, "");
      return res.status(400).json({ error: error });
    }
    const comment = new Comment({ parentId, body, author, authorId });
    const updatedPost = await Post.updateOne(
      { _id: parentId },
      { $inc: { commentCount: 1 }, $push: { comments: authorId } }
    );
    await comment.save();
    return res
      .status(201)
      .json({ message: "Comment successfully", data: comment });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Comment.findById({ _id: id });
    if (!data) {
      return res
        .status(404)
        .json({ error: `comment with id ${id} does not exist` });
    }
    return res.status(200).json({ data });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

const getByParentPost = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Comment.find({ parentId: id });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: `comments with parent id ${id} does not exist` });
    }
    return res.status(200).json({ data });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

const voteComment = async (req, res) => {
  const { option, voterId } = req.body;
  const { id } = req.params;
  try {
    let findCommentId = await Comment.findById({ _id: id });
    if (!findCommentId) {
      return res.status(404).json({ error: `Comment with id ${id} not found` });
    }

    findCommentId = votes(option, voterId, findCommentId);
    findCommentId.voteScore =
      findCommentId.supportVoters.length - findCommentId.opposeVoters.length;

    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      findCommentId,
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

const editComment = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });
    if (!data) {
      return res
        .status(404)
        .json({ error: `No post with that id of ${req.params.id}` });
    }
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Comment.findByIdAndDelete({ _id: id });
    if (!data) {
      return res
        .status(404)
        .json({ error: `Comment with the id of ${id} does not exist` });
    }
    await Post.updateOne(
      { _id: data.parentId },
      { $inc: { commentCount: -1 }, $pull: { comments: data.authorId } }
    );
    return res.status(200).json({ data });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

module.exports = {
  addComment,
  getCommentById,
  getByParentPost,
  editComment,
  voteComment,
  deleteComment,
};
