// Import the FS
const fs = require("node:fs");

// Create a function to get all authors
const getAllAuthors = (req, res)=>{
    // Get Info from the file
    fs.readFile("./Models/authors.json", "utf8", (err, data)=>{
        if(err){
            res.send("Failed to get Data")
        } else {
            res.json(JSON.parse(data))
        }
    })
}

// Create a function to post new authors
const createNewAuthors = (req, res)=>{
    // Get the request object with data to saved in the authors.json file
    fs.readFile("./Models/authors.json", (err, data)=>{
        if(err){
            res.send("Failed to get data")
        } else {
            // Write data to the File
            fs.writeFile("./Models/authors.json", JSON.stringify([...JSON.parse(data), req.body], null, 2), (err)=>{
                if(err){
                    res.send("Failed to save new author")
                } else {
                    res.send("Successfully saved new author")
                }
            })
        }
    })
}

// Export all the functions
module.exports = {
    getAllAuthors,
    createNewAuthors
}