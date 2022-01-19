const express = require('express');
const { userSignup, userLogin, changePassword, resetPassword } = require("../controller/user");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/changePasswordNotification", changePassword);
router.post("/auth/resetPassword", resetPassword);

module.exports = router;