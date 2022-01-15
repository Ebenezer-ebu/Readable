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
  let { username, email, password } = req.body;
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
      password,
    });
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);
    await user.save();
    return res
      .status(201)
      .json({ message: "User successfully created", user, token });
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
    return res.status(200).json({ message: "User login successfully" });
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
    const hash = hashPassword(resetToken);

    await new Token({
      userId: userInDB._id,
      token: hash,
    }).save();

    const link = `${process.env.clientURL}/passwordReset?token=${resetToken}&id=${userInDB._id}`;

    sendEmail(
      user.email,
      "Password Reset Request",
      {
        name: userInDB.username,
        link: link,
      },
      "./template/requestResetPassword.handlebars"
    );
    return res.status(200).json({ link });
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
    const isValid = await bcrypt.compare(token, resetToken.token);
    if (!isValid) {
      return res.status(409).json({ error: "Invalid or expired token" });
    }
    const hashedPassword = hashedPassword(newPassword);
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
    return res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    return res.status(500).json({ error, message: "Internal server error" });
  }
};

module.exports = { userSignup, userLogin, changePassword, resetPassword };
