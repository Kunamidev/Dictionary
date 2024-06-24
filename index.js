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

// Root endpoint to show a message requesting a word
app.get('/', (req, res) => {
  res.json({ message: 'Please provide a word' });
});

// Endpoint to get dictionary data for a specified word
app.get('/word/:word', async (req, res) => {
  const word = req.params.word;
  const dictionaryData = await fetchDictionaryData(word);
  res.json(dictionaryData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});