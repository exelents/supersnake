const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const highScoresFilePath = path.join(__dirname, '../data/highScores.txt');

// Get high scores
router.get('/', (req, res) => {
  console.log('Fetching high scores...');
  fs.readFile(highScoresFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading high scores:', err);
      return res.status(500).json({ error: 'Failed to read high scores' });
    }
    const highScores = data ? JSON.parse(data) : [];
    res.json(highScores);
  });
});

// Post a new high score
router.post('/', (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== 'number') {
    console.error('Invalid high score data:', req.body);
    return res.status(400).json({ error: 'Invalid high score data' });
  }

  console.log('Saving new high score:', { name, score });

  fs.readFile(highScoresFilePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Error reading high scores:', err);
      return res.status(500).json({ error: 'Failed to read high scores' });
    }

    const highScores = data ? JSON.parse(data) : [];
    highScores.push({ name, score });

    // Sort and keep top 5 scores
    highScores.sort((a, b) => b.score - a.score);
    const topHighScores = highScores.slice(0, 5);

    fs.writeFile(highScoresFilePath, JSON.stringify(topHighScores, null, 2), (err) => {
      if (err) {
        console.error('Error saving high score:', err);
        return res.status(500).json({ error: 'Failed to save high score' });
      }
      res.json(topHighScores);
    });
  });
});

module.exports = router;