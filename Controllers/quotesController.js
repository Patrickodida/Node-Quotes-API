// Import Files System
const fs = require("node:fs");
// Import Prisma Client
const { PrismaClient } = require('@prisma/client');

const Prisma = new PrismaClient();

// create a function to get all Quotes
const getAllQuotes = async (req, res) => {
  try{
    const quotes = await Prisma.quote.findMany();
    res.status(200).json(quotes);
  }catch(error){
    const error500 = "INTERNAL_SERVER_ERROR";
    console.error(error)
    res.status(500).send(`${error500}: Failed to get all users`)
  }
};

// create a function to post quotes
const createNewQuotes = (req, res)=>{
    // Get the request object with data to save in quotes.json file
    fs.readFile("./Models/quotes.json", (err, data)=>{
        if(err){
            res.send("Failed to get quotes")
        } else {
            // Write data to the file
            fs.writeFile("./Models/quotes.json", JSON.stringify([...JSON.parse(data), req.body], null, 2), (err)=>{
                if(err){
                    res.send("Failed to save new quote")
                } else {
                    res.send("Successfully saved new quote")
                }
            })
        }
    })
}

// Create a function to retrieve a specific quote by ID
const getQuoteById = (req, res)=>{
  const { id } = req.params;
  fs.readFile("./Models/quotes.json", "utf8", (err, data)=>{
    if(err){
      res.send("Failed to get data")
    } else {
      const quotes = JSON.parse(data);
      const quote = quotes.find(q => q.id == id);
      if(quote){
        res.json(quote)
      } else {
        res.send("Quote not found")
      }
    }
  })
}

// Create a function to update an existing quote by ID
const updateQuoteId = (req, res)=>{
  const { id } = req.params;
  const { quote, authorId } = req.body;
  fs.readFile("./Models/quotes.json", "utf8", (err, data)=>{
    if(err){
      res.send("Failed to get data")
    } else {
      const quotes = JSON.parse(data);
      const index = quotes.findIndex(q => q.id === id);
      if(index !== -1){
        // Update the quote
        quotes[index] = { id, quote, authorId };
        fs.writeFile("./Models/quotes.json", JSON.stringify(quote, null, 2), (err)=>{
          if(err){
            res.send("Failed to update quote")
          } else {
            res.send("Successfully updated quote")
          }
        })
      } else {
        res.send("Quote not found")
      }
    }
  })
}

// Create a function to delete a quote by ID
const deleteQuoteById = (req, res)=>{
  const { id } = req.params;
  fs.readFile("./Models/quotes.json", "utf8", (err, data)=>{
    if(err){
      res.send("Failed to get data")
    } else {
      let quotes = JSON.parse(data);
      const quoteIndex = quotes.findIndex(q => q.id == id);
      if(quoteIndex !== -1){
        quotes = quotes.filter(q => q.id != id)
        // Write updated data to the file
        fs.writeFile("./Models/quotes.json", JSON.stringify(quotes, null, 2), (err)=>{
          if(err){
            res.send("Failed to delete quote")
          } else {
            res.send("Successfully deleted quote")
          }
        })
      } else {
        res.send("Quote not found")
      }
    }
  })
}

// Export All Function
module.exports = {
    getAllQuotes,
    createNewQuotes,
    getQuoteById,
    updateQuoteId,
    deleteQuoteById
}
