const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const { addTitleAndBody } = require("../utils/validate");
const { votes } = require("../utils/helpers");

const addPost = async (req, res) => {
  const { title, body, author, authorId, category } = req.body;
  try {
    const verify = addTitleAndBody.validate({ title, body });
    if (verify.error) {
      let error = verify.error.details[0].message.replace(/[\"]/g, "");
      return res.status(400).json({ error: error });
    } else {
      const post = new Post({ title, body, author, authorId, category });
      await post.save();
      return res.status(201).json({ message: "Post successfully", data: post });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const getData = async (req, res) => {
  try {
    const data = await Post.find();
    if (data) {
      return res.status(200).json({ data });
    }
    return res.status(400).json({ message: "No post data found" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const getByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const findPost = await Post.find({ category });
    if (findPost.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json({ data: findPost });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const findPostId = await Post.findById({ _id: id });
    if (!findPostId) {
      return res.status(404).json({ error: `Post with id ${id} not found` });
    }
    return res.status(200).json({ data: findPostId });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const votePost = async (req, res) => {
  const { option, voterId } = req.body;
  const { id } = req.params;
  try {
    let findPostId = await Post.findById({ _id: id });
    if (!findPostId) {
      return res.status(404).json({ error: `Post with id ${id} not found` });
    }
    findPostId = votes(option, voterId, findPostId);
    findPostId.voteScore =
      findPostId.supportVoters.length - findPostId.opposeVoters.length;
    const updated = await Post.findByIdAndUpdate(req.params.id, findPostId, {
      new: true,
      runValidators: true,
      context: "query",
    });
    return res.status(200).json({ data: updated });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!data)
      return res
        .status(404)
        .json({ error: `No post with that id of ${req.params.id}` });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Post.findByIdAndDelete({ _id: id });
    if (!data) {
      return res.status(404).json({ error: `No post with that id of ${id}` });
    }
    await Comment.deleteMany({ parentId: id });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      err,
    });
  }
};

module.exports = {
  addPost,
  getData,
  getByCategory,
  getById,
  votePost,
  editPost,
  deletePost,
};
