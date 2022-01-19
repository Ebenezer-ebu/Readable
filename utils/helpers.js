const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

/** Generate Token
 * @param {string} id
 * @returns {string} returns generated token
 */
const JWTSecret = process.env.JWT_SECRET;

const generateToken = (payload) => {
  console.log(payload, "****************");
  const token = JWT.sign(payload, JWTSecret, { expiresIn: "3d" });
  console.log(token);
  return token;
};

/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */
const saltRounds = Number(process.env.SALT_ROUND);
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = (password) => bcrypt.hashSync(password, salt);

/**
 * comparePassword
 * @param {string} hashPassword
 * @param {string} password
 * @returns {Boolean} return True or False
 */
const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/**
 * validatePassword helper method
 * @param {string} password
 * @returns {Boolean} True or False
 */
const validatePassword = (password) => {
  if (password.length <= 5 || password === "") {
    return false;
  }
  return true;
};

module.exports = {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  generateToken,
};
