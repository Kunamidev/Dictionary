const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Function to fetch dictionary data for a given word
const fetchDictionaryData = async (word) => {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dictionary data:', error);
    return { error: 'Could not fetch dictionary data at this time.' };
  }
};

// Endpoint to get dictionary data for a specified word (query parameter)
app.get('/', async (req, res) => {
  const word = req.query.word;
  if (!word) {
    return res.status(400).json({ error: 'Please provide a word to search for.' });
  }
  const dictionaryData = await fetchDictionaryData(word);
  res.json({ word, dictionaryData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
