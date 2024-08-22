// Import Files System
const fs = require("node:fs");
// Import Prisma Client
const { PrismaClient } = require("@prisma/client");

const Prisma = new PrismaClient();

// create a function to get all Quotes
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Prisma.quote.findMany();
    res.status(200).json(quotes);
  } catch (error) {
    const error500 = "INTERNAL_SERVER_ERROR";
    console.error(error);
    res.status(500).send(`${error500}: Failed to get all users`);
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
    res.status(200).json(newQuote);
  } catch (error) {
    const error500 = "SERVER_ERROR";
    console.error(error);
    res.status(500).send(`${error500}: Failed to create new quote`);
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
      res.status(200).json(quote);
    } else {
      res.status(404).send("Quote not found");
    }
  } catch (error) {
    const error500 = "SERVER_ERROR";
    console.error(error);
    res
      .status(500)
      .send(`${error500}: Failed to retrieve a specific quote by ID`);
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
      res.status(200).json(quote);
    } else {
      res.status(404).send("Quote not found");
    }
  } catch (error) {
    const error500 = "SERVER_ERROR";
    console.error(error);
    res
      .status(500)
      .send(`${error500}: Failed to update a specific author by ID`);
  }
};

// Create a function to delete a quote by ID
const deleteQuoteById = (req, res) => {
  const { id } = req.params;
  fs.readFile("./Models/quotes.json", "utf8", (err, data) => {
    if (err) {
      res.send("Failed to get data");
    } else {
      let quotes = JSON.parse(data);
      const quoteIndex = quotes.findIndex((q) => q.id == id);
      if (quoteIndex !== -1) {
        quotes = quotes.filter((q) => q.id != id);
        // Write updated data to the file
        fs.writeFile(
          "./Models/quotes.json",
          JSON.stringify(quotes, null, 2),
          (err) => {
            if (err) {
              res.send("Failed to delete quote");
            } else {
              res.send("Successfully deleted quote");
            }
          }
        );
      } else {
        res.send("Quote not found");
      }
    }
  });
};

// Export All Function
module.exports = {
  getAllQuotes,
  createNewQuotes,
  getQuoteById,
  updateQuoteId,
  deleteQuoteById,
};
