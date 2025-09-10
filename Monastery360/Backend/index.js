const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


app.use('/assets', express.static('assets'));

// Sample monastery data
const monasteries = [
  {
    id: 1,
    name: "Rumtek Monastery",
    image: "/assets/Monastery/Monastery1/monastery1_1.jpg",
    location: "Rumtek, Sikkim",
    lat: "27.3333",
    lng: "88.6111",
    description: "Rumtek Monastery is the largest monastery in Sikkim and serves as an important center for Buddhist learning and practice."
  },
  {
    id: 2,
    name: "Pemayangtse Monastery",
    image: "/assets/Monastery/Monastery2/monastery2_1.jpg",
    location: "Pemayangtse, Sikkim",
    lat: "27.3280",
    lng: "88.2742",
    description: "Pemayangtse is one of the oldest monasteries in Sikkim, known for its spiritual importance and stunning architecture."
  },
  {
    id: 3,
    name: "Tashiding Monastery",
    image: "/assets/Monastery/Monastery3/monastery3_1.jpg",
    location: "Tashiding, Sikkim",
    lat: "27.3306",
    lng: "88.3812",
    description: "A sacred pilgrimage site, Tashiding Monastery is perched on a hill and offers panoramic views of the surrounding valleys."
  },
  {
    id: 4,
    name: "Phodang Monastery",
    image: "/assets/Monastery/Monastery4/monastery4_1.jpg",
    location: "Phodang, Sikkim",
    lat: "27.2280",
    lng: "88.5333",
    description: "Phodang Monastery is a tranquil retreat with centuries-old traditions of meditation and prayer."
  },
  {
    id: 5,
    name: "Enchey Monastery",
    image: "/assets/Monastery/Monastery5/monastery5_1.webp",
    location: "Gangtok, Sikkim",
    lat: "27.3388",
    lng: "88.6065",
    description: "Situated near Gangtok, Enchey Monastery is known for its spiritual rituals and beautiful murals."
  },
  {
    id: 6,
    name: "Dubdi Monastery",
    image: "/assets/Monastery/Monastery6/monastery6_1.jpg",
    location: "Yuksom, Sikkim",
    lat: "27.3208",
    lng: "88.4278",
    description: "Dubdi Monastery is the oldest in Sikkim and offers insight into the earliest Buddhist practices in the region."
  },
  {
    id: 7,
    name: "Ralang Monastery",
    image: "/assets/Monastery/Monastery7/monastery7_1.jpg",
    location: "Ralang, Sikkim",
    lat: "27.1500",
    lng: "88.5500",
    description: "Ralang Monastery is renowned for its vibrant festivals and peaceful environment."
  },
  {
    id: 8,
    name: "Sanga Choeling Monastery",
    image: "/assets/Monastery/Monastery8/monastery8_1.jpg",
    location: "Pelling, Sikkim",
    lat: "27.2927",
    lng: "88.2166",
    description: "A hidden gem, Sanga Choeling is perched on a ridge and offers a serene spiritual atmosphere."
  },
  {
    id: 9,
    name: "Phensang Monastery",
    image: "/assets/Monastery/Monastery9/monastery9_1.jpg",
    location: "Phensang, Sikkim",
    lat: "27.3300",
    lng: "88.5300",
    description: "Phensang Monastery is a quiet retreat, ideal for spiritual seekers and meditation."
  },
  {
    id: 10,
    name: "Lingdum Monastery",
    image: "/assets/Monastery/Monastery10/monastery10_1.jpg",
    location: "Ranka, Sikkim",
    lat: "27.3400",
    lng: "88.5700",
    description: "Lingdum Monastery offers a blend of traditional Buddhist architecture and modern spiritual practices."
  },
  {
    id: 11,
    name: "Tsomgo Monastery",
    image: "/assets/Monastery/Monastery11/monastery11_1.jpg",
    location: "Tsomgo Lake, Sikkim",
    lat: "27.5400",
    lng: "88.8200",
    description: "Located near the scenic Tsomgo Lake, this monastery is a hub for pilgrims and tourists alike."
  },
  {
    id: 12,
    name: "Zong Dog Palri Monastery",
    image: "/assets/Monastery/Monastery12/monastery12_1.jpg",
    location: "Ravangla, Sikkim",
    lat: "27.1300",
    lng: "88.4000",
    description: "This monastery is a stunning example of Tibetan architecture, offering spiritual teachings and scenic beauty."
  },
  {
    id: 13,
    name: "Buddha Park of Ravangla",
    image: "/assets/Monastery/Monastery13/monastery13_1.jpg",
    location: "Phodong, Sikkim",
    lat: "27.1000",
    lng: "88.4300",
    description: "A serene park housing a large statue of Buddha, surrounded by landscaped gardens and meditation spaces."
  },
  {
    id: 14,
    name: "Namchi Monastery",
    image: "/assets/Monastery/Monastery14/monastery14_1.jpg",
    location: "Namchi, Sikkim",
    lat: "27.1500",
    lng: "88.5300",
    description: "Namchi Monastery is a spiritual retreat known for its peaceful ambiance and community involvement."
  },
  {
    id: 15,
    name: "Gurudongmar Monastery",
    image: "/assets/Monastery/Monastery15/monastery15_1.jpg",
    location: "North Sikkim",
    lat: "27.9900",
    lng: "88.5800",
    description: "Located at a high altitude, Gurudongmar Monastery is revered for its spiritual sanctity and breathtaking views."
  },
  {
    id: 16,
    name: "Khecheopalri Monastery",
    image: "/assets/Monastery/Monastery16/monastery16_1.jpg",
    location: "Khecheopalri Lake, Sikkim",
    lat: "27.2900",
    lng: "88.5500",
    description: "Famous for its sacred lake, this monastery attracts pilgrims who seek blessings and spiritual renewal."
  }
];



// Sample festival data
const festivals = [
  {
    id: 1,
    name: "Pang Lhabsol",
    description: "Pang Lhabsol is a sacred festival celebrated exclusively in Sikkim, honoring Mount Kanchenjunga, the guardian deity of the region. It is a vibrant occasion blending spirituality, folklore, and community traditions, attracting locals and visitors alike. The festival lasts several days and showcases dances, prayers, and rituals that symbolize protection and prosperity.",
    image: ["/assets/Festival/Festival_1/festival1_1.webp","/assets/Festival/Festival_1/festival1_2.jpg","/assets/Festival/Festival_1/festival1_3.jpg","/assets/Festival/Festival_1/festival1_4.jpg","/assets/Festival/Festival_1/festival1_5.jpg","/assets/Festival/Festival_1/festival1_6.jpg","/assets/Festival/Festival_1/festival1_7.jpg"],
    history_origins: "Pang Lhabsol originated in the 13th century during the reign of the third Chogyal of Sikkim, who established the festival to venerate Mount Kanchenjunga. The mountain was considered a protective deity, safeguarding the people and land. Over centuries, the festival evolved, blending Buddhist teachings, local animist traditions, and folk customs. Its history reflects the deep interconnection between the Sikkimese people, their rulers, and their natural surroundings. The festival also symbolizes the preservation of local folklore, transmitting ancient myths and legends from one generation to the next. Through Pang Lhabsol, the people of Sikkim maintain spiritual continuity while strengthening cultural identity and respect for nature.",
    rituals_practices: [
      "Warrior Dance depicting ancient battles and heroic legends, performed by young men wearing traditional attire and symbolic weapons.",
      "Prayers and offerings conducted at local monasteries, invoking blessings of protection, prosperity, and health for families and communities.",
      "Community gatherings where elders narrate myths and historical stories, transmitting cultural values, morals, and teachings to younger generations.",
      "Processions that include sacred masks, ceremonial music, and symbolic artifacts, representing spiritual guardianship and divine presence.",
      "Special rituals involving symbolic purification of homes and villages, ensuring harmony between humans, nature, and divine forces."
    ],
    cultural_significance: "Pang Lhabsol strengthens unity among diverse ethnic groups, fostering social cohesion and shared spiritual values. It cultivates reverence for nature, emphasizing environmental stewardship through ritual symbolism. The festival reinforces the collective memory and identity of the Sikkimese people, linking modern society with ancestral traditions. It also serves as a platform for cultural education, teaching younger generations about history, mythology, and moral conduct. Through celebration, storytelling, and communal participation, Pang Lhabsol nurtures harmony, resilience, and cultural pride, while preserving the intangible heritage of the region for centuries to come."
  },
  {
    id: 2,
    name: "Losar Festival",
    description: "Losar marks the Tibetan New Year, celebrated with elaborate prayers, feasts, and cultural performances. The festival symbolizes new beginnings, spiritual cleansing, and communal harmony, offering a chance to reflect on the past year and embrace the future. It spans several days and showcases rituals unique to Tibetan Buddhist traditions.",
    image: ["/assets/Festival/Festival_2/festival2_1.jpg"],
    history_origins: "Losar was introduced by Tibetan settlers and has been celebrated for centuries. Its origins lie in both spiritual and agricultural cycles, aligning with the lunar calendar to mark seasonal renewal. The festival historically emphasized purification rituals, prayers for protection, and community solidarity. Monasteries played a central role, organizing ceremonies and teaching moral and spiritual lessons. Over time, Losar adapted to local Sikkimese customs while retaining core Tibetan traditions. The festival reflects the integration of Buddhism with regional culture, preserving sacred texts, chants, and ritual arts. It also illustrates how festivals served as social anchors, reinforcing hierarchies, moral codes, and communal responsibilities across generations.",
    rituals_practices: [
      "Thorough cleaning of homes and monasteries to remove negativity and welcome prosperity and positive energy into the new year.",
      "Prayer ceremonies at monasteries, including chanting, offering butter lamps, and recitation of sacred scriptures, promoting spiritual reflection and merit-making.",
      "Cultural performances such as traditional dances, masked dances, and folk music, celebrating heritage, storytelling, and community identity.",
      "Feasts with family and community members, featuring symbolic foods that represent health, longevity, and wealth.",
      "Exchange of blessings, gifts, and greetings among neighbors and relatives, strengthening social cohesion and nurturing goodwill.",
      "Processions featuring ritual objects, sacred banners, and ritual dances that narrate historical and spiritual stories passed down through generations."
    ],
    cultural_significance: "Losar promotes spiritual cleansing, reflection, and renewal, encouraging ethical conduct and mindfulness. It reinforces familial bonds and strengthens community cohesion, creating shared experiences of joy and devotion. The festival sustains cultural continuity by transmitting rituals, music, dance, and religious teachings to younger generations. It also enhances identity, connecting Sikkimese Tibetans with a broader Buddhist and Himalayan cultural heritage. Through collective celebration, Losar nurtures resilience, gratitude, and hope, reminding participants of the cyclical nature of life and the importance of spiritual balance, morality, and compassion."
  },
  {
    id: 3,
    name: "Saga Dawa",
    description: "Saga Dawa is a sacred Buddhist festival celebrating the birth, enlightenment, and passing of Lord Buddha. Observed on the full moon of the fourth lunar month, it attracts devotees from Sikkim and neighboring regions, providing opportunities for deep spiritual reflection, meditation, and merit-making.",
    image: ["/assets/Festival/Festival_3/festival3_1.jpg"],
    history_origins: "Saga Dawa has roots in ancient Buddhist traditions and is closely aligned with lunar calendars. The festival commemorates the key events in the life of Lord Buddha, making it a spiritually significant time for prayers, pilgrimages, and acts of charity. Historically, monasteries acted as centers for organizing religious teachings, rituals, and community support, ensuring the festival remained central to spiritual life. Saga Dawa illustrates how Buddhism shaped local culture and moral values, promoting compassion, mindfulness, and ethical behavior. It also reflects the intertwining of cosmology, lunar cycles, and social practices in Himalayan societies.",
    rituals_practices: [
      "Lighting butter lamps in temples, monasteries, and homes to symbolize wisdom, enlightenment, and dispelling darkness from ignorance.",
      "Offering prayers, reciting sutras, and engaging in meditation to cultivate compassion, spiritual insight, and ethical awareness.",
      "Pilgrimages to sacred monasteries, stupas, and holy sites, often involving long-distance walks as acts of devotion and humility.",
      "Charitable acts such as distributing food, clothing, and essentials to the needy, embodying the Buddha’s teachings on generosity and compassion.",
      "Participating in community chanting, debates, and teachings organized by monasteries to reinforce spiritual knowledge and moral guidance.",
      "Observing ethical conduct, abstaining from harm, and performing rituals that honor the Buddha’s life and his teachings for personal and communal benefit."
    ],
    cultural_significance: "Saga Dawa strengthens spiritual discipline, fostering ethical behavior and compassion among devotees. It reinforces community cohesion by involving collective rituals, pilgrimages, and charitable activities. The festival preserves cultural heritage by teaching Buddhist philosophy, moral principles, and meditative practices to younger generations. It promotes mindfulness, resilience, and inner peace, nurturing a sense of purpose and connection with the broader spiritual universe. Through shared devotion, Saga Dawa helps sustain moral, cultural, and social structures, ensuring continuity of Himalayan Buddhist traditions."
  },
  {
    id: 4,
    name: "Namsoong Festival",
    description: "Namsoong is a post-harvest festival celebrated with rituals, dances, and feasts. It honors the spirits of the land and expresses gratitude for agricultural abundance while fostering social bonds and community identity.",
    image: ["/assets/Festival/Festival_4/festival4_1.jpg"],
    history_origins: "Namsoong dates back to ancient agrarian practices, where communities marked the end of the harvest season with offerings to deities and spirits. Its origins lie in both spiritual reverence and practical acknowledgment of the importance of agriculture. Over generations, Namsoong evolved to include elaborate dances, music, and community feasts, integrating folklore, storytelling, and moral lessons. The festival represents a connection between humans, nature, and the supernatural, emphasizing the cyclical rhythms of life. It also showcases the cultural ingenuity of rural societies, using celebration as a medium for education, bonding, and spiritual continuity.",
    rituals_practices: [
      "Harvest offerings made to local deities and ancestral spirits, symbolizing gratitude for protection, fertility, and prosperity.",
      "Traditional dances performed by community members that narrate historical events, agricultural practices, and spiritual legends.",
      "Community feasts that bring together families, neighbors, and villagers, reinforcing social ties and shared identity.",
      "Storytelling sessions led by elders, passing down knowledge about farming cycles, ethics, and cultural heritage.",
      "Rituals to bless seeds, livestock, and fields for the upcoming agricultural season, ensuring continuity and abundance.",
      "Engagement of youth in performing dances, songs, and rituals to maintain cultural continuity and instill pride in heritage."
    ],
    cultural_significance: "Namsoong fosters social cohesion, gratitude, and respect for nature. It educates the community about agricultural cycles, ethical living, and spiritual harmony. The festival encourages intergenerational participation, ensuring that traditional knowledge, folklore, and moral values are passed down. It celebrates the interconnectedness of humans, environment, and divine forces, reinforcing collective responsibility and sustainable practices. Namsoong strengthens cultural pride and resilience, promoting unity, joy, and continuity of ancestral wisdom."
  },
  {
    id: 5,
    name: "Losoong Festival",
    description: "Losoong is a harvest festival that marks the completion of the agricultural season. It celebrates community solidarity, gratitude for the harvest, and cultural preservation through dances, rituals, and feasts.",
     image: ["/assets/Festival/Festival_5/festival5_1.jpg"],
    history_origins: "Losoong originated in agrarian communities as a way to honor the gods and ancestors for bountiful harvests. It combines ritual offerings, ceremonial dances, and social celebrations. Over centuries, the festival incorporated Tibetan Buddhist elements, local folklore, and artistic expressions, making it a multifaceted cultural event. Losoong reflects the cyclical nature of agrarian life, emphasizing gratitude, protection, and renewal. Monasteries and village councils historically played pivotal roles in coordinating rituals, preserving oral histories, and reinforcing social cohesion.",
    rituals_practices: [
      "Mask dances performed by skilled artists representing protective deities and ancestral spirits.",
      "Prayer gatherings at monasteries for blessings of health, prosperity, and protection in the coming year.",
      "Community feasts shared by families, neighbors, and local authorities, reinforcing social bonds and unity.",
      "Games and competitions that strengthen community engagement and preserve traditional skills and sports.",
      "Processions carrying ritual artifacts, sacred symbols, and musical instruments to narrate legends and spiritual teachings.",
      "Educational storytelling to convey moral lessons, history, and local customs to younger generations."
    ],
    cultural_significance: "Losoong reinforces gratitude, harmony, and communal solidarity. It preserves intangible cultural heritage through dances, music, and ritual practices. The festival educates younger generations on ethics, social responsibilities, and spiritual values. It promotes cohesion across different social groups, emphasizing the importance of collaboration, generosity, and respect for ancestors. Through Losoong, communities reaffirm their identity, sustain traditions, and celebrate collective achievements, ensuring cultural continuity in a rapidly changing world."
  },
  {
    id: 6,
    name: "Phang Lhabsol",
    description: "Phang Lhabsol is a religious festival honoring the protective deity of Mount Kanchenjunga. It merges mythology, spirituality, and community participation in elaborate rituals, dances, and prayers.",
     image: ["/assets/Festival/Festival_6/festival6_1.jpg"],
    history_origins: "Phang Lhabsol has ancient origins, rooted in the belief that Mount Kanchenjunga protects the land and people. Early communities observed seasonal rites to align with natural cycles and seek blessings from the mountain deity. Over centuries, Buddhist teachings and local folklore merged, creating elaborate ceremonies that include dances, offerings, and symbolic acts of devotion. The festival illustrates the interplay of spirituality, mythology, and community governance. It also highlights the cultural importance of natural landmarks, showing how people historically integrated environment, religion, and social life into festivals.",
    rituals_practices: [
      "Sacred dances narrating mythological tales, the protection of the kingdom, and divine interventions.",
      "Offerings to the mountain deity, including food, incense, and symbolic gifts, representing human-nature harmony.",
      "Community prayers for safety, prosperity, and well-being, led by monks and elders, emphasizing collective spirituality.",
      "Processions with masks, ceremonial attire, and traditional instruments, illustrating historical and spiritual narratives.",
      "Youth participation in ritual enactments to ensure continuity of cultural knowledge and community identity.",
      "Ritual purification of homes and public spaces, promoting harmony between humans, nature, and spiritual forces."
    ],
    cultural_significance: "Phang Lhabsol preserves myths, spiritual beliefs, and traditional practices, ensuring cultural continuity. It strengthens communal identity and pride, connecting people with their historical roots. The festival promotes environmental awareness, ethical living, and spiritual reflection. By involving multiple generations, Phang Lhabsol transmits intangible heritage, values, and rituals, reinforcing social cohesion and cultural resilience. It celebrates human connection to nature, spirituality, and collective memory, nurturing a shared sense of belonging and reverence for ancestral wisdom."
  }
];


const volunteermonasteries = [
  {
    monasteryId: 1,
    activities: "Teaching English, helping in library, assisting monks with IT basics.",
    phone: "+91-359-222-XXXX",
    email: "info@rumtek.org"
  },
  {
    monasteryId: 2,
    activities: "Preservation of murals, visitor guidance",
    phone: "+91-359-222-YYYY",
    email: "contact@pemayangtse.org"
  },
  {
    monasteryId: 3,
    activities: "Environmental cleanup, festival support",
    phone: "+91-359-222-ZZZZ",
    email: "info@tashiding.org"
  },
  {
    monasteryId: 5,
    activities: "Prayer hall arrangements, cultural event support",
    phone: "+91-359-222-AAAA",
    email: "contact@enchey.org"
  }
];


app.get('/api/monasteries', (req, res) => {
  res.json(monasteries);
});


app.get('/api/festivals', (req, res) => {
  res.json(festivals);
});


app.get('/api/festivals/:name', (req, res) => {
  const { name } = req.params;
  const festival = festivals.find(
    f => f.name.toLowerCase() === decodeURIComponent(name).toLowerCase()
  );

  if (!festival) {
    return res.status(404).json({ error: "Festival not found" });
  }

  res.json(festival);
});


app.get("/api/volunteer", (req, res) => {
  const combined = volunteermonasteries.map((vol) => {
    const monastery = monasteries.find((m) => m.id === vol.monasteryId);
    return {
      ...vol,
      name: monastery?.name || "Unknown",
      location: monastery?.location || "Unknown",
      image: monastery?.image || "/assets/default.jpg",
      description: monastery?.description || ""
    };
  });

  res.json(combined);
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
