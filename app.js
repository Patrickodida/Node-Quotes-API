// Import Libraries
const express = require("express");
const fs = require("node:fs");
const cors = require('cors');
const path = require("node:path");
const authorRouter = require("./Routes/authorsRoutes");
const quoteRouter = require("./Routes/quotesRoutes");
const userRouter = require("./Routes/usersRouter");
const { StatusCodes } =require('http-status-codes');

const app = express();

// Middleware for Logging Requests
app.use((req, res, next) => {
  // get start time
  const startTime = new Date();
  // Listen to the 'finish' listener to capture 'endTime'
  res.on("finish", () => {
    // After response is sent get the end time
    const endTime = new Date();
    // Get the duration in Miliseconds
    const duration = endTime - startTime;
    // Log Details; TImestamp, method, URL, and response status
    const logDetails = `[Start Time: ${startTime}] ${req.method} ${req.url} ${
      res.statusCode
    } [End Time: ${endTime}] [Duration: ${duration}ms]\n`;
    // Append the log details to 'request_logs.txt' file
    fs.appendFile(
      path.join(__dirname, "Logs", "request_logs.txt"),
      logDetails,
      (err) => {
        if (err) {
          console.log("Failed to write logs:", err);
        }
      }
    );
  });
  // Move to the next Middleware
  next();
});

// Middle to parse JSON bodies
app.use(express.json());

// Define CORS Options
const corsOptions = {
  origin: '*',
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}

// Enable CORS
app.use(cors(corsOptions));

app.use("/authors", authorRouter);

app.use("/quotes", quoteRouter);

app.use("/users", userRouter);

// Catch errors for all Undefined Routes (404 Error Handling)
app.use((req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({ error: "Route not found" });
});

// General Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong" });
});

// Set request handlers based on the API endpoints
app.get("/", (req, res) => {
  res.send(`<h1 style="color: blue">Welcome to my quote API</h1>`);
});

// Set the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
