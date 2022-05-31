const express = require('express');
const router = express.Router();

const { userSignup, userLogin, changePassword, resetPassword } = require("../controller/user");

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/changePasswordNotification", changePassword);
router.post("/auth/resetPassword", resetPassword);

module.exports = router;