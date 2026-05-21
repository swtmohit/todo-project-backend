const express = require('express');
const signup = require('../controllers/auth/signup');
const login = require('../controllers/auth/login');
const logout = require('../controllers/auth/logout');
const profile = require('../controllers/auth/profile');
const { protect } = require('../middleware/authMiddleware');
const { loginValidation, signupValidation } = require('../validators/authValidators');

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/logout', protect, logout);
router.get('/profile', protect, profile);

module.exports = router;
