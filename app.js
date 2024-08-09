// Import Libraries
const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const authorRouter = require('./Routes/authorsRoutes');
const quoteRouter = require('./Routes/quotesRoutes');

const app = express();

// Middleware for Logging Requests
app.use((req, res, next)=>{
    // get start time
    const startTime = new Date();
    // Move to the next Middleware
    next();
    // After response is sent get the end time
    const endTime = new Date();
    // Log Details; TImestamp, method, URL, and response status
    const logDetails = `[${startTime.toISOString()}] ${req.method} ${req.url} ${res.statusCode}\n`;
    // Append the log details to 'request_logs.txt' file
    fs.appendFile(path.join(__dirname, 'Logs', 'request_logs.txt'), logDetails, (err)=>{
        if(err){
            console.log("Failed to write logs:", err)
        }
    })

})

// Middle to parse JSON bodies
app.use(express.json());

app.use("/authors", authorRouter);

app.use("/quotes", quoteRouter);

// Set request handlers based on the API endpoints
app.get("/", (req, res)=>{
    res.send(`<h1 style="color: blue">Welcome to my quote API</h1>`)
});

// Set the server to listen on port 5000
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`)
});