const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // allow requests from frontend
app.use(express.json()); // parse JSON requests

// Serve static files (images, etc.) from the 'assets' folder
app.use('/assets', express.static('assets'));

// Sample monastery data
const monasteries = [
  { id: 1, name: "Rumtek Monastery", image: "/assets/monastery1.jpg" },
  { id: 2, name: "Pemayangtse Monastery", image: "/assets/monastery2.jpg" },
  { id: 3, name: "Tashiding Monastery", image: "/assets/monastery3.jpg" }
];

// API route to get monasteries
app.get('/api/monasteries', (req, res) => {
  res.json(monasteries);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
