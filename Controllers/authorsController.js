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
const updateAuthorById = (req, res)=>{
    const { id } = req.params;
    fs.readFile("./Models/authors.json", "utf8", (err, data)=>{
        if(err){
            res.send("Failed to get data")
        } else {
            const authors = JSON.parse(data);
            const authorIndex = authors.findIndex(a => a.id == id);
            if(authorIndex !== -1){
                authors[authorIndex] = { ...authors[authorIndex], ...req.body}
                // Write updated data to the file
                fs.writeFile("./Models/authors.json", JSON.stringify(authors, null, 2), (err)=>{
                    if(err){
                        res.send("Failed to update author")
                    } else {
                        res.json(authors[authorIndex])
                    }
                })
            } else {
                res.send("Author not found")
            }
        }
    })
}

// Create a function to delete an author by ID
const deleteAuthorById = (req, res)=>{
    const { id } = req.params;
    fs.readFile("./Models/authors.json", "utf8", (err, data)=>{
        if(err){
            res.send("Failed to get data")
        } else {
            let authors = JSON.parse(data);
            const authorIndex = authors.findIndex(a => a.id == id);
            if(authorIndex !== -1){
                authors = authors.filter(a => a.id != id);
                // Write updated data to the file
                fs.writeFile("./Models/authors.json", JSON.stringify(authors, null, 2), (err)=>{
                    if(err){
                        res.send("Failed to delete author")
                    } else {
                        res.send("Successfully deleted author")
                    }
                })
            } else {
                res.send("Author not found")
            }
        }
    })
}
// Export all the functions
module.exports = {
    getAllAuthors,
    createNewAuthors,
    getAuthorById,
    updateAuthorById,
    deleteAuthorById
}