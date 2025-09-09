const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;


app.use(cors()); 
app.use(express.json()); 

app.use('/assets', express.static('assets'));

// Sample monastery data
const monasteries = [
  { id: 1, name: "Rumtek Monastery", image: "/assets/monastery1.jpg", location: "Rumtek, Sikkim" },
  { id: 2, name: "Pemayangtse Monastery", image: "/assets/monastery2.jpg", location: "Pemayangtse, Sikkim" },
  { id: 3, name: "Tashiding Monastery", image: "/assets/monastery3.jpg", location: "Tashiding, Sikkim" },
  { id: 4, name: "Phodang Monastery", image: "/assets/monastery4.jpg", location: "Phodang, Sikkim" },
  { id: 5, name: "Enchey Monastery", image: "/assets/monastery5.webp", location: "Gangtok, Sikkim" },
  { id: 6, name: "Dubdi Monastery", image: "/assets/monastery6.jpg", location: "Yuksom, Sikkim" },
  { id: 7, name: "Ralang Monastery", image: "/assets/monastery7.jpg", location: "Ralang, Sikkim" },
  { id: 8, name: "Sanga Choeling Monastery", image: "/assets/monastery8.jpg", location: "Pelling, Sikkim" },
  { id: 9, name: "Phensang Monastery", image: "/assets/monastery9.jpg", location: "Phensang, Sikkim" },
  { id: 10, name: "Lingdum Monastery", image: "/assets/monastery10.jpg", location: "Ranka, Sikkim" },
  { id: 11, name: "Tsomgo Monastery", image: "/assets/monastery12.jpg", location: "Tsomgo Lake, Sikkim" },
  { id: 12, name: "Zong Dog Palri Monastery", image: "/assets/monastery11.jpg", location: "Ravangla, Sikkim" },
  { id: 13, name: "Buddha Park of Ravangla", image: "/assets/monastery13.jpg", location: "Phodong, Sikkim" },
  { id: 14, name: "Namchi Monastery", image: "/assets/monastery14.jpg", location: "Namchi, Sikkim" },
  { id: 15, name: "Gurudongmar Monastery", image: "/assets/monastery15.jpg", location: "North Sikkim" },
  { id: 16, name: "Khecheopalri Monastery", image: "/assets/monastery16.jpg", location: "Khecheopalri Lake, Sikkim" }
];


app.get('/api/monasteries', (req, res) => {
  res.json(monasteries);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
