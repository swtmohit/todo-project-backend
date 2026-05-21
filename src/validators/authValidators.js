const { body } = require('express-validator');
const { validate } = require('../helpers/validate');

const emailRule = body('email')
  .trim()
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Please enter a valid email address')
  .normalizeEmail();

const passwordRule = body('password')
  .notEmpty()
  .withMessage('Password is required')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters');

const signupValidation = validate([
  body('name').trim().notEmpty().withMessage('Name is required'),
  emailRule,
  passwordRule,
]);

const loginValidation = validate([emailRule, passwordRule]);

module.exports = {
  loginValidation,
  signupValidation,
};
