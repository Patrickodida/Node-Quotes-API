// Import Libraries
const express = require('express');
const router = express.Router();
const fs = require('node:fs');
const authorsController = require('../Controllers/authorsController');

// Get Authors
router.get("/", authorsController.getAllAuthors);

// Post New Authors
router.post("/", authorsController.createNewAuthors);

// Export Router
module.exports = router;