const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Serve static files like images
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

// Sample festival data
const festivals = [
  {
    id: 1,
    name: "Pang Lhabsol",
    description: "Pang Lhabsol is celebrated only in Sikkim, honoring Mount Kanchenjunga with rituals and dances.",
    image: "/assets/festival1.jpg",
    history_origins: "Introduced by the third Chogyal of Sikkim in the 13th century to venerate Mount Kanchenjunga as the guardian deity.",
    rituals_practices: ["Warrior Dance", "Prayers and offerings", "Community gathering"],
    cultural_significance: "Reinforces unity and harmony among different ethnic groups while connecting them with nature and spirituality."
  },
  {
    id: 2,
    name: "Losar Festival",
    description: "Losar marks the Tibetan New Year with prayers, feasts, and cultural celebrations.",
    image: "/assets/festival2.jpg",
    history_origins: "Brought by Tibetan settlers, observed with rituals passed down for generations, and aligned with the lunar calendar.",
    rituals_practices: ["House cleaning", "Prayer ceremonies", "Cultural performances"],
    cultural_significance: "Strengthens community bonds, promotes spiritual reflection, and celebrates new beginnings."
  },
  {
    id: 3,
    name: "Saga Dawa",
    description: "Saga Dawa celebrates the birth, enlightenment, and death of Lord Buddha, a revered festival in Sikkim.",
    image: "/assets/festival3.jpg",
    history_origins: "Rooted in Buddhist traditions and aligned with the full moon of the fourth lunar month.",
    rituals_practices: ["Lighting butter lamps", "Offering prayers", "Pilgrimages to monasteries"],
    cultural_significance: "Encourages compassion, mindfulness, and spiritual practices among followers."
  },
  {
    id: 4,
    name: "Namsoong Festival",
    description: "Namsoong is a post-harvest festival celebrated with rituals, dances, and community feasts.",
    image: "/assets/festival4.jpg",
    history_origins: "Celebrated after the agricultural harvest, this festival honors the spirits and seeks blessings for future prosperity.",
    rituals_practices: ["Harvest offerings", "Traditional dances", "Community feasts"],
    cultural_significance: "Strengthens rural life, gratitude towards nature, and social cohesion."
  },
  {
    id: 5,
    name: "Losoong Festival",
    description: "Losoong is a vibrant festival marking the end of the harvest season with rituals and cultural events.",
    image: "/assets/festival5.jpg",
    history_origins: "Celebrated widely by various communities to thank the gods and ancestors for a bountiful harvest.",
    rituals_practices: ["Mask dances", "Prayer gatherings", "Feasts and games"],
    cultural_significance: "Promotes gratitude, harmony, and the preservation of cultural heritage."
  },
  {
    id: 6,
    name: "Phang Lhabsol",
    description: "Phang Lhabsol is a religious festival invoking the protective deity of Mount Kanchenjunga, blending myth and tradition.",
    image: "/assets/festival6.jpg",
    history_origins: "Originating from ancient beliefs, this festival aligns spiritual worship with the seasonal calendar.",
    rituals_practices: ["Sacred dances", "Offerings to deities", "Community prayers"],
    cultural_significance: "Preserves folklore, instills reverence for nature, and strengthens the cultural identity of the people."
  }
];

// Routes
app.get('/api/monasteries', (req, res) => {
  res.json(monasteries);
});

app.get('/api/festivals', (req, res) => {
  res.json({ festivals: festivals });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
