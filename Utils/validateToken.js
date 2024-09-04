const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = (req, res, next)=>{
    // Check the request headers for the token
    const authHeader = req.headers.authorization;
    if(authHeader){
        let token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err){
                req.json(err);
            }else{
                next();
            }
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json(`Authorization Header with Access Token is missing`)
    }
}

module.exports = validateToken;