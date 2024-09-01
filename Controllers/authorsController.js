// Import the FS
const fs = require("node:fs");
// Import Prisma Client
const { PrismaClient } = require("@prisma/client");
// Import StatusCodes
const { StatusCodes } =require('http-status-codes');

const Prisma = new PrismaClient();

// Function to get all authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Prisma.author.findMany();
    res.status(StatusCodes.OK).json(authors);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Failed to get all authors');
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
    res.status(StatusCodes.OK).send(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Failed to create new author');
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
      res.status(StatusCodes.OK).json(author);
    } else {
      res.status(StatusCodes.NOT_FOUND).send("Author not found");
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('Failed to retrieve a specific author by ID');
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
      res.status(StatusCodes.OK).json(author);
    } else {
      res.status(StatusCodes.NOT_FOUND).send("Author not found");
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('Failed to update a specific author by ID');
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
        res.status(StatusCodes.OK).json(author);
  }catch(error){
    console.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Failed to delete a specific author by ID')
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
