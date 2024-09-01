const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Prisma = new PrismaClient();

// Function to Get User
const getUsers = async(req, res)=>{
    const users = await Prisma.user.findMany();
    res.status(StatusCodes.OK).json(users);
}

// Function to Login User
const loginUsers = async(req,res)=>{
        // Destructure the request body
        const { username, password } = req.body;
        const user = await Prisma.user.findUnique({
            where: {
                username
            }
        })
        if(user){
            if(user.password === password){
                // Create Token
                const token = await jwt.sign(
                    {id: user.id, role: user.role},
                    process.env.SECRET_kEY,
                    {expiresIn: "1h"}
                )
                // Send the token as a response
                res.status(StatusCodes.OK).json({ token, message: "Login successful" });
            } else {
                res.status(StatusCodes.FORBIDDEN).json({error: "password was incorrect"});
            }
            res.status(StatusCodes.OK).json();
        } else {
            res.status(StatusCodes.NOT_FOUND).json({error:"user was not found"});
        }
    }

// Export all Functions
module.exports = {
    getUsers,
    loginUsers
}