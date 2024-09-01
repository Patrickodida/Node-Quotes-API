const express = require('express');
const { getUsers, loginUsers } = require('../Controllers/usersController.js');
const router = express.Router();

// Get User
router.get('/', getUsers)
// Post user
router.post('/login', loginUsers)

module.exports = router;