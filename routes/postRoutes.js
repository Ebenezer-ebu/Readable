const express = require("express");
const router = express.Router();

const {
  addPost,
  getData,
  getByCategory,
  getById,
  votePost,
  editPost,
  deletePost,
} = require("../controller/posts");

router.post("/posts", addPost);
router.get("/posts", getData);
router.get("/:category/posts", getByCategory);
router.get("/posts/:id", getById);
router.post("/posts/:id", votePost);
router.put("/posts/:id", editPost);
router.delete("/posts/:id", deletePost);

module.exports = router;
