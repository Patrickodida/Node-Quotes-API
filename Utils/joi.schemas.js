const Joi = require('joi');

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
    authorSchema,
    quoteSchema
};