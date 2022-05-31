const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentById,
  getByParentPost,
  editComment,
  voteComment,
  deleteComment,
} = require("../controller/comments");

router.post("/comments", addComment);
router.get("/comments/:id", getCommentById);
router.get("/posts/:id/comments", getByParentPost);
router.put("/comments/:id", editComment);
router.post("/comments/:id", voteComment);
router.delete("/comments/:id", deleteComment);

module.exports = router;
