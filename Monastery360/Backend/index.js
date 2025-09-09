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

// Sample festival data
const festivals = [
  {
    id: 1,
    name: "Pang Lhabsol",
    description: "Pang Lhabsol is a sacred festival celebrated exclusively in Sikkim, honoring Mount Kanchenjunga, the guardian deity of the region. It is a vibrant occasion blending spirituality, folklore, and community traditions, attracting locals and visitors alike. The festival lasts several days and showcases dances, prayers, and rituals that symbolize protection and prosperity.",
    image: ["/assets/festival1_1.jpg","/assets/festival1_2.jpg","/assets/festival1_3.jpg","/assets/festival1_4.jpg","/assets/festival1_5.jpg","/assets/festival1_6.jpg","/assets/festival1_7.jpg"],
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
     image: ["/assets/festival1_1.jpg","/assets/festival1_2.jpg","/assets/festival1_3.jpg","/assets/festival1_4.jpg","/assets/festival1_5.jpg","/assets/festival1_6.jpg","/assets/festival1_7.jpg"],
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
    image: ["/assets/festival1_1.jpg","/assets/festival1_2.jpg","/assets/festival1_3.jpg","/assets/festival1_4.jpg","/assets/festival1_5.jpg","/assets/festival1_6.jpg","/assets/festival1_7.jpg"],
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
     image: ["/assets/festival1_1.jpg","/assets/festival1_2.jpg","/assets/festival1_3.jpg","/assets/festival1_4.jpg","/assets/festival1_5.jpg","/assets/festival1_6.jpg","/assets/festival1_7.jpg"],
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
     image: ["/assets/festival1_1.jpg","/assets/festival1_2.jpg","/assets/festival1_3.jpg","/assets/festival1_4.jpg","/assets/festival1_5.jpg","/assets/festival1_6.jpg","/assets/festival1_7.jpg"],
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
     image: ["/assets/festival1_1.jpg","/assets/festival1_2.jpg","/assets/festival1_3.jpg","/assets/festival1_4.jpg","/assets/festival1_5.jpg","/assets/festival1_6.jpg","/assets/festival1_7.jpg"],
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



app.get('/api/monasteries', (req, res) => {
  res.json(monasteries);
});

app.get('/api/festivals', (req, res) => {
  res.json({ festivals: festivals });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
