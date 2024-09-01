// Import Files System
const fs = require("node:fs");
// Import Prisma Client
const { PrismaClient } = require("@prisma/client");
// Import StatusCodes
const { StatusCodes } = require('http-status-codes');

const Prisma = new PrismaClient();

// create a function to get all Quotes
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Prisma.quote.findMany();
    res.status(StatusCodes.OK).json(quotes);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Failed to get all users');
  }
};

// create a function to post quotes
const createNewQuotes = async (req, res) => {
  try {
    const { id, text, category } = req.body;
    const newQuote = await Prisma.quote.create({
      data: {
        id: id,
        text: text,
        category: category,
      },
    });
    res.status(StatusCodes.OK).json(newQuote);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Failed to create new quote');
  }
};

// Function to retrieve a specific quote by ID
const getQuoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const quote = await Prisma.quote.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (quote) {
      res.status(StatusCodes.OK).json(quote);
    } else {
      res.status(StatusCodes.NOT_FOUND).send("Quote not found");
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('Failed to retrieve a specific quote by ID');
  }
};

// Create a function to update an existing quote by ID
const updateQuoteId = async (req, res) => {
  const { id } = req.params;
  try {
    const { text, category } = req.body;
    const quote = await Prisma.quote.update({
      where: {
        id: parseInt(id),
      },
      data: {
        text: text,
        category: category,
      },
    });
    if (quote) {
      res.status(StatusCodes.OK).json(quote);
    } else {
      res.status(StatusCodes.NOT_FOUND).send("Quote not found");
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('Failed to update a specific author by ID');
  }
};

// Create a function to delete a quote by ID
const deleteQuoteById = async (req, res) => {
  const { id } = req.params;
  try{
    const quote = await Prisma.quote.delete({
      where: {
        id: parseInt(id)
      }
    })
    res.status(StatusCodes.OK).json(quote);
  }catch(error){
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Failed to delete quote by ID')
  }
};

// Export All Function
module.exports = {
  getAllQuotes,
  createNewQuotes,
  getQuoteById,
  updateQuoteId,
  deleteQuoteById,
};
