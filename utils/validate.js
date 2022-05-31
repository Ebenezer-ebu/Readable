const Joi = require("joi");

const addTitleAndBody = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  body: Joi.string().min(3).max(1024).required(),
});

const commentBody = Joi.object({
  body: Joi.string().min(3).max(1024).required(),
});

module.exports = { addTitleAndBody, commentBody };
