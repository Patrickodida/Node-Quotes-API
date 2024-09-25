const express = require('express');
const { getUsers, loginUsers, createUser } = require('../Controllers/usersController.js');
const validateToken = require('../Utils/validateToken.js');
const validateRequest = require('../Utils/joi.validator.js')
const {userSchema} = require('../Utils/joi.schemas.js')
const router = express.Router();

// Get User
router.get('/', getUsers)
// Register User
router.post('/register', validateRequest(userSchema), createUser)
// Post user
router.post('/login', loginUsers)

module.exports = router;