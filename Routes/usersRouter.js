const express = require('express');
const { getUsers, loginUsers, createUser } = require('../Controllers/usersController.js');
const validateToken = require('../Utils/validateToken.js');
const router = express.Router();

// Get User
router.get('/', validateToken, getUsers)
// Register User
router.post('/register', createUser)
// Post user
router.post('/login', loginUsers)

module.exports = router;