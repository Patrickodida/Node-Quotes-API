// Import Libraries
const express = require('express');
const fs = require('node:fs');
const authorRouter = require('./Routes/authorsRoutes');

const app = express();

// Middleware
app.use(express.json());

app.use("/authors", authorRouter);

// Set request handlers based on the API endpoints
app.get("/", (req, res)=>{
    res.send(`<h1 style="color: blue">Welcome to my quote API</h1>`)
});

// Set the server to listen on port 5000
const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`)
});