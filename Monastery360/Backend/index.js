const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;


app.use(cors()); 
app.use(express.json()); 

app.use('/assets', express.static('assets'));

// Sample monastery data
const monasteries = [
  { id: 1, name: "Rumtek Monastery", image: "/assets/monastery1.jpg" },
  { id: 2, name: "Pemayangtse Monastery", image: "/assets/monastery2.jpg" },
  { id: 3, name: "Tashiding Monastery", image: "/assets/monastery3.jpg" },
  { id: 4, name: "Phodang Monastery", image: "/assets/monastery4.jpg" }
];


app.get('/api/monasteries', (req, res) => {
  res.json(monasteries);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
