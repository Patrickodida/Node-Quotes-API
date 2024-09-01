const { PrismaClient } = require('@prisma/client');
const StatusCodes = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Prisma = new PrismaClient();

// Function to Get User
const getUsers = async(req, res)=>{
    const users = await Prisma.user.findMany();
    res.status(200).json(users);
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
                res.status(200).json({ token, message: "Login successful" });
            } else {
                res.status(403).json({error: "password was incorrect"});
            }
            res.status(200).json();
        } else {
            res.status(404).json({error:"user was not found"});
        }
    }

// Export all Functions
module.exports = {
    getUsers,
    loginUsers
}