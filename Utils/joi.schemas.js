const Joi = require('joi');

// User Schema
const userSchema = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(10).required()
});

// Author Schema
const authorSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().min(2).max(50).required(),
    picture: Joi.string().uri().required()
});

// Quote Schema
const quoteSchema = Joi.object({
    id: Joi.number().integer().required(),
    text: Joi.string().min(20).max(1000).required(),
    category: Joi.string().min(4).max(25).required()
})

module.exports = {
    userSchema,
    authorSchema,
    quoteSchema
};