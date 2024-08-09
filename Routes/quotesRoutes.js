// Import Libraries
const express = require('express');
const router = express.Router();
const fs = require('node:fs');
const quotesController = require('../Controllers/quotesController');

// Get Quotes
router.get("/", quotesController.getAllQuotes);

// Post New Quotes
router.post("/", quotesController.createNewQuotes);

// Export Router
module.exports = router;