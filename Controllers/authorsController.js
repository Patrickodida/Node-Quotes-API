// Import the FS
const fs = require("node:fs");
// Import Prisma Client
const { PrismaClient } = require("@prisma/client");

const Prisma = new PrismaClient();

// Function to get all authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Prisma.author.findMany();
    res.status(200).json(authors);
  } catch (error) {
    const error500 = "INTERNAL_SERVER_ERROR";
    console.error(error);
    res.status(500).send(`${error500}: Faile to get all authors`);
  }
};

// Function to post new authors
const createNewAuthors = async (req, res) => {
  try {
    const { id, name, picture } = req.body;
    const newAuthor = await Prisma.author.create({
      data: {
        id,
        name,
        picture,
      },
    });
    res.status(200).send(newAuthor);
  } catch (error) {
    const error500 = "SERVER_ERROR";
    console.error(error);
    res.status(500).send(`${error500}: Failed to create new author`);
  }
};

// Create a function to retrieve a specific author by ID
const getAuthorById = (req, res) => {
  const { id } = req.params;
  fs.readFile("./Models/authors.json", "utf8", (err, data) => {
    if (err) {
      res.send("Failed to get author");
    } else {
      const authors = JSON.parse(data);
      const author = authors.find((a) => a.id == id);
      if (author) {
        res.json(author);
      } else {
        res.send("Author not found");
      }
    }
  });
};
// Create a function to update the existing author by ID
const updateAuthorById = (req, res) => {
  const { id } = req.params;
  fs.readFile("./Models/authors.json", "utf8", (err, data) => {
    if (err) {
      res.send("Failed to get data");
    } else {
      const authors = JSON.parse(data);
      const authorIndex = authors.findIndex((a) => a.id == id);
      if (authorIndex !== -1) {
        authors[authorIndex] = { ...authors[authorIndex], ...req.body };
        // Write updated data to the file
        fs.writeFile(
          "./Models/authors.json",
          JSON.stringify(authors, null, 2),
          (err) => {
            if (err) {
              res.send("Failed to update author");
            } else {
              res.json(authors[authorIndex]);
            }
          }
        );
      } else {
        res.send("Author not found");
      }
    }
  });
};

// Create a function to delete an author by ID
const deleteAuthorById = (req, res) => {
  const { id } = req.params;
  fs.readFile("./Models/authors.json", "utf8", (err, data) => {
    if (err) {
      res.send("Failed to get data");
    } else {
      let authors = JSON.parse(data);
      const authorIndex = authors.findIndex((a) => a.id == id);
      if (authorIndex !== -1) {
        authors = authors.filter((a) => a.id != id);
        // Write updated data to the file
        fs.writeFile(
          "./Models/authors.json",
          JSON.stringify(authors, null, 2),
          (err) => {
            if (err) {
              res.send("Failed to delete author");
            } else {
              res.send("Successfully deleted author");
            }
          }
        );
      } else {
        res.send("Author not found");
      }
    }
  });
};
// Export all the functions
module.exports = {
  getAllAuthors,
  createNewAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
};
