const app = require('./server.js');

// Set the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
