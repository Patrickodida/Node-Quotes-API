// Import Files System
const fs = require("node:fs");

// create a function to get all Quotes
const getAllQuotes = (req, res) => {
  // Get Info from the file
  fs.readFile("./Models/quotes.json", "utf8", (err, data) => {
    if (err) {
      res.send("Failed to get quotes");
    } else {
      res.json(JSON.parse(data));
    }
  });
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
  //const id = parseInt(req.params.id);
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

// Create a function to delete a quote by ID

// Export All Function
module.exports = {
    getAllQuotes,
    createNewQuotes,
    getQuoteById
}
