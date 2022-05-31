const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/helpers");
const { sendEmail } = require("../utils/sendEmail");

const userSignup = async (req, res) => {
  let { username, email, imageUrl, password } = req.body;
  password = hashPassword(password);
  try {
    //does email exits in database
    const userInDB = await User.findOne({ email });
    if (userInDB) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = new User({
      username,
      email,
      imageUrl,
      password,
    });
    sendEmail(
      user.email,
      "Welcome To Readable",
      {
        name: user.username,
      },
      "./template/welcome.handlebars"
    );
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);
    await user.save();
    return res.status(201).json({
      message: "User successfully created go ahead and login",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error, message: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInDB = await User.findOne({ email });
    if (!userInDB) {
      return res
        .status(404)
        .json({ error: "User does not exits you need to signup first" });
    }
    const correctPassword = comparePassword(userInDB.password, password);
    if (!correctPassword) {
      return res.status(400).json({ error: "Wrong Password" });
    }
    let obj = {
      username: userInDB.username,
      userId: userInDB._id,
      email: userInDB.email,
      imageUrl: userInDB.imageUrl,
    };
    const token = await generateToken(obj);
    return res
      .status(200)
      .json({ message: "User login successfully", token, userInDB });
  } catch (error) {
    return res.status(500).json({ error, message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  const { email } = req.body;
  try {
    const userInDB = await User.findOne({ email });
    if (!userInDB) {
      return res
        .status(404)
        .json({ error: "User does not exits you need to signup first" });
    }
    let token = await Token.findOne({ userId: userInDB._id });
    if (token) await token.deleteOne();

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await hashPassword(resetToken);
    await new Token({
      userId: userInDB._id,
      token: hash,
    }).save();

    const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${userInDB._id}`;

    sendEmail(
      userInDB.email,
      "Password Reset Request",
      {
        name: userInDB.username,
        link: link,
      },
      "./template/requestResetPassword.handlebars"
    );
    return res.status(200).json({
      message: "Check your email to confirm change of password",
      link,
    });
  } catch (error) {
    return res.status(500).json({ error, message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  const { userId, token, newPassword } = req.body;
  try {
    let resetToken = await Token.findOne({ userId });
    if (!resetToken) {
      return res.status(409).json({ error: "Invalid or expired token" });
    }
    const isValid = await comparePassword(resetToken.token, token);
    if (!isValid) {
      return res.status(409).json({ error: "Invalid or expired token" });
    }

    const hashedPassword = await hashPassword(newPassword);

    await User.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    const user = await User.findById({ _id: userId });

    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.username,
      },
      "./template/resetPassword.handlebars"
    );

    await resetToken.deleteOne();
    return res
      .status(200)
      .json({ message: "Password Reset Successfully go ahead to login" });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = { userSignup, userLogin, changePassword, resetPassword };
