const express = require('express');
const router = express.Router();
const { signup, signin, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', protect, getMe);
router.post('/logout', logout);

module.exports = router;
