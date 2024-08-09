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
            const authors = JSON.parse(data);
            const newAuthor = req.body;
            authors.push(newAuthor);
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

// Create a function to retrieve a specific author by ID
const getAuthorById = (req, res)=>{
    const { id } = req.params;
    fs.readFile("./Models/authors.json", "utf8", (err, data)=>{
        if(err){
            res.send("Failed to get author")
        } else {
            const authors = JSON.parse(data);
            const author = authors.find(a => a.id == id);
            if(author){
                res.json(author);
            } else {
                res.send("Author not found")
            }
        }
    })
}
// Create a function to update the existing author by ID

// Create a function to delete an author by ID

// Export all the functions
module.exports = {
    getAllAuthors,
    createNewAuthors,
    getAuthorById
}