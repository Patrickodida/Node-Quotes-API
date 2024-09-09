const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Prisma = new PrismaClient();

// Function to Get User
const getUsers = async(req, res)=>{
    const users = await Prisma.user.findMany();
    res.status(StatusCodes.OK).json(users);
}

// Function to register the user(Hash Password)
const createUser = async(req, res)=>{
    const { username, password, email, role } = req.body;
    try{
        // check if the user already exists
        const existingUser = await Prisma.user.findUnique({
            where: {
                username
            }
        });
        if(existingUser){
            return res.status(StatusCodes.CONFLICT).json({error: "username already exists"})
        };
        // Hash Password with 10 salt rounds before saving it
        const hashedPassword = await bcrypt.hash(password,10);
        // create user in the database
        const newUser = await Prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                email,
                role
            }
        });
        res.status(StatusCodes.CREATED).json({message: "user created successfully",user: newUser});
    } catch(error){
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Failed to create user"});
    }
}

// Function to Login User(Compare Passwords)
const loginUsers = async(req,res)=>{
        // Destructure the request body
        const { username, password } = req.body;
        try{
            const user = await Prisma.user.findUnique({
            where: {
                username
            }
        })
        if(user){
            // Compare the password with the hashedPassword
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(isPasswordValid){
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
        }catch(error){
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Failed to login user"})
        }
        
    }

// Export all Functions
module.exports = {
    getUsers,
    createUser,
    loginUsers
}