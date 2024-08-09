# Node.js Quote API

- This project is a simple Quote API built using Node.js and Express.js. The API allows you to perform CRUD operations on quotes and authors stored in JSON files. It also includes request logging functionality, storing all logs in a logs/request_logs.txt file.

## Installation

- To run this project locally, you'll need to have Node.js installed. Follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Patrickodida/Node-Quotes-API
```

2. Navigate to the project directory:

```bash
cd node-quote-api
```

3. Install the required dependencies:

```bash
npm install
```

## Usage

- To start the server run the following command

```bash
node app.js
```

The server will start and listen on `http://localhost:3000`

## API Endpoints

### Authors

- **GET /authors:** - Retrieve all authors
- **POST /authors:** - Create new Author
- **GET /authors/:** - Retrieve a specific author by ID
- **PUT /authors/:** - Update an existing author by ID
- **DELETE /authors/:** - Delete an author by ID

### Quotes

- **GET /quotes:** - Retrieve all quotes
- **POST /quotes:** - Create a new quote
- **GET /quotes/:** - Retrieve a specific quote by ID
- **PUT /quotes/:** - Update an existing quote by ID
- **DELETE /quotes/:** - Delete a quote by ID

## Request Logging

- The application logs all requests to a logs/request_logs.txt file. Each log entry includes the following details:

* Timestamp
* HTTP method
* URL
* Response status

## Project Structure

- **Controllers:** - Contains the logic for handling API requests.
- **Models:** - Stores the JSON data for authors and quotes.
- **Routes:** - Defines the API endpoints and maps them to controller functions.
- **Logs:** - Contains the request_logs.txt file where all request logs are stored.
- **app.js:** - The main entry point for the application.
