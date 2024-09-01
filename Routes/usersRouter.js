const express = require('express');
const { getUsers, loginUsers } = require('../Controllers/usersController.js');
const validateToken = require('../Utils/validateToken.js');
const router = express.Router();

// Get User
router.get('/', validateToken, getUsers)
// Post user
router.post('/login', loginUsers)

module.exports = router;