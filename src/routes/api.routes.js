const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;