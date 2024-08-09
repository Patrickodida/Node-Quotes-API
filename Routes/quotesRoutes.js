// Import Libraries
const express = require('express');
const router = express.Router();
const fs = require('node:fs');
const quotesController = require('../Controllers/quotesController');

// Get Quotes
router.get("/", quotesController.getAllQuotes);

// Post New Quotes
router.post("/", quotesController.createNewQuotes);

// Get Quote by ID
router.get("/:id", quotesController.getQuoteById);

// Update Existing Quote by ID
router.put("/", quotesController.updateQuoteId);

// Export Router
module.exports = router;