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

// Function to retrieve a specific author by ID
const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Prisma.author.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).send("Author not found");
    }
  } catch (error) {
    const error500 = "SERVER_ERROR";
    console.error(error);
    res
      .status(500)
      .send(`${error500}: Failed to retrieve a specific author by ID`);
  }
};

// Function to update the existing author by ID
const updateAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, picture } = req.body;
    const author = await Prisma.author.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        picture: picture,
      },
    });
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).send("Author not found");
    }
  } catch (error) {
    const error500 = "SERVER_ERROR";
    console.error(error);
    res
      .status(500)
      .send(`${error500}: Failed to update a specific author by ID`);
  }
};

// Function to delete an author by ID
const deleteAuthorById = async (req, res) => {
  const { id } = req.params;
  try{
    const author = await Prisma.author.delete({
        where: {
            id: parseInt(id)
        }
    })
        res.status(200).json(author);
  }catch(error){
    const error500 = "SERVER_ERROR";
    console.error(error)
    res.status(500).send(`${error500}: Failed to delete a specific author by ID`)
  }
};

// Export all the functions
module.exports = {
  getAllAuthors,
  createNewAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
};
