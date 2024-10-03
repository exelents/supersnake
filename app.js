const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const highScoresRouter = require('./routes/highScores');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "node_modules" directory
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// High scores routes
app.use('/api/highScores', highScoresRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});