const axios = require("axios");
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
    image: ["/assets/Monastery/Monastery1/monastery1_1.jpg","/assets/Monastery/Monastery1/monastery1_2.jpg","/assets/Monastery/Monastery1/monastery1_3.jpg","/assets/Monastery/Monastery1/monastery1_4.jpg","/assets/Monastery/Monastery1/monastery1_5.jpg","/assets/Monastery/Monastery1/monastery1_6.jpg","/assets/Monastery/Monastery1/monastery1_7.jpg","/assets/Monastery/Monastery1/monastery1_8.jpg","/assets/Monastery/Monastery1/monastery1_9.jpg","/assets/Monastery/Monastery1/monastery1_10.jpg"],
    location: "Rumtek, Sikkim",
    lat: "27.3333",
    lng: "88.6111",
    description: "Rumtek Monastery is the largest monastery in Sikkim and serves as an important center for Buddhist learning and practice.",
    history: "While a monastery existed here earlier, the current grand structure was established in the 1960s by the 16th Karmapa, Rangjung Rigpe Dorje, upon his exile from Tibet. It was designed to be a near-replica of the Tsurphu Monastery, the original seat of the Karmapa in Tibet. Funded by the royal family of Sikkim and the Indian government, it became the main seat of the Karma Kagyu lineage in exile. The monastery serves as a crucial center for preserving the lineage's sacred texts, religious art, and ritual traditions. It also houses the Golden Stupa, which contains the holy relics of the 16th Karmapa, making it a major pilgrimage site.",
    architecture: "Features traditional Tibetan-style architecture with golden roofs, prayer halls, intricate murals, and a large stupa.",
    spiritualSignificance: "Seat of the Karma Kagyu lineage and hosts important teachings, rituals, and festivals like Chaam dances.",
    quickFacts: {
      established: "1966",
      sect: "Karma Kagyu",
      monks: 150,
      altitude: "1,500 m"
    },
    visitorInfo: {
      hours: "8:00 AM - 5:00 PM",
      fees: "Free entry",
      itinerary: "2-3 hours",
      booking: "No prior booking required"
    },
    festivals: ["Chaam Dance Festival", "Losar"]
  },
  {
    id: 2,
    name: "Pemayangtse Monastery",
    image: ["/assets/Monastery/Monastery2/monastery2_1.jpg"],
    location: "Pemayangtse, Sikkim",
    lat: "27.3280",
    lng: "88.2742",
    description: "One of Sikkim’s oldest monasteries, known for its spiritual importance and architecture.",
    history: "Founded in 1705 by Lama Lhatsun Chempo, one of the three revered lamas who consecrated the first Chogyal (king) of Sikkim. Pemayangtse, meaning 'Perfect Sublime Lotus', is one of the oldest and most significant monasteries of the Nyingma order. It was established with the intention of housing 'ta-tshang' or 'monks of pure Tibetan lineage'. Historically, the monks of this monastery held a superior status and were responsible for performing religious ceremonies for the royal family. It has played a pivotal role in Sikkim's religious and political history, serving as the head of all other Nyingma monasteries in the state.",
    architecture: "Stone and timber construction with ornate murals, prayer halls, and a huge central stupa.",
    spiritualSignificance: "Houses sacred scriptures and is a central spiritual site for the Nyingma sect.",
    quickFacts: {
      established: "1705",
      sect: "Nyingma",
      monks: 80,
      altitude: "1,420 m"
    },
    visitorInfo: {
      hours: "9:00 AM - 4:00 PM",
      fees: "₹50 per person",
      itinerary: "1-2 hours",
      booking: "No prior booking required"
    },
    festivals: ["Pang Lhabsol", "Chaam Dance Festival"]
  },
  {
    id: 3,
    name: "Tashiding Monastery",
    image: ["/assets/Monastery/Monastery3/monastery3_1.jpg"],
    location: "Tashiding, Sikkim",
    lat: "27.3306",
    lng: "88.3812",
    description: "A sacred pilgrimage site perched on a hill with panoramic valley views.",
    history: "Considered the most sacred monastery in Sikkim, Tashiding was founded in the 17th century by Ngadak Sempa Chempo, one of the three lamas involved in Sikkim's first consecration ceremony. The site is believed to have been blessed by Guru Padmasambhava himself. Legend says he shot an arrow into the air, vowing to meditate where it landed, and it fell on the very hill where the monastery now stands. Its name means 'The Devoted Central Glory'. A mere sight of the monastery is said to cleanse a devotee of all sins. It is the epicenter of the holy 'Bumchu' festival, which draws pilgrims from across the Himalayan region.",
    architecture: "Tibetan-style structure with prayer halls, stupas, and sacred relics.",
    spiritualSignificance: "One of the holiest monasteries in Sikkim, attracting pilgrims from across the region.",
    quickFacts: {
      established: "17th century",
      sect: "Nyingma",
      monks: 50,
      altitude: "1,300 m"
    },
    visitorInfo: {
      hours: "8:30 AM - 4:30 PM",
      fees: "Free entry",
      itinerary: "2 hours",
      booking: "No prior booking"
    },
    festivals: ["Cham Dance Festival", "Losar"]
  },
  {
    id: 4,
    name: "Phodang Monastery",
    image: ["/assets/Monastery/Monastery4/monastery4_1.jpg"],
    location: "Phodang, Sikkim",
    lat: "27.2280",
    lng: "88.5333",
    description: "A tranquil retreat with centuries-old meditation and prayer traditions.",
    history: "Established in the early 18th century by the 4th Chogyal of Sikkim, Gyurmed Namgyal, Phodang Monastery is one of the six most important monasteries in the state. It belongs to the Kagyupa sect of Tibetan Buddhism. The original structure was founded by the Chogyal, but it was later rebuilt, preserving its ancient murals and religious artifacts. The monastery is home to a large community of monks and is highly regarded for its beautiful architecture and serene atmosphere. It serves as a major center for religious education and meditation, deeply influencing the spiritual life of North Sikkim.",
    architecture: "Simple Tibetan-style structures with prayer halls and murals depicting Buddhist teachings.",
    spiritualSignificance: "Important meditation and retreat center, known for its peaceful environment.",
    quickFacts: {
      established: "Early 18th century",
      sect: "Nyingma",
      monks: 40,
      altitude: "1,400 m"
    },
    visitorInfo: {
      hours: "9:00 AM - 4:00 PM",
      fees: "Free entry",
      itinerary: "1-2 hours",
      booking: "No prior booking"
    },
    festivals: ["Losar"]
  },
  {
    id: 5,
    name: "Enchey Monastery",
    image: ["/assets/Monastery/Monastery5/monastery5_1.webp"],
    location: "Gangtok, Sikkim",
    lat: "27.3388",
    lng: "88.6065",
    description: "Known for spiritual rituals and beautiful murals.",
    history: "The history of Enchey Monastery, meaning 'Solitary Temple,' dates back over 200 years. The site was blessed by the revered tantric master Lama Druptob Karpo, who was known for his ability to fly and built a small hermitage here. The present pagoda-style structure was built in 1909 during the reign of Sidkeong Tulku Namgyal. Belonging to the Nyingma order, it is believed that the protecting deities of Kanchenjunga and Yabdean reside at this monastery. This spiritual significance makes it a protector of Gangtok, and no other major construction is allowed near it.",
    architecture: "Tibetan-style structure with frescoes and prayer wheels.",
    spiritualSignificance: "Hosts important Buddhist rituals and serves as a center for Nyingma teachings.",
    quickFacts: {
      established: "1909",
      sect: "Nyingma",
      monks: 50,
      altitude: "1,400 m"
    },
    visitorInfo: {
      hours: "7:00 AM - 5:00 PM",
      fees: "Free entry",
      itinerary: "1-2 hours",
      booking: "No booking needed"
    },
    festivals: ["Losar", "Chaam Dance Festival"]
  },
  {
    id: 6,
    name: "Dubdi Monastery",
    image: ["/assets/Monastery/Monastery6/monastery6_1.jpg"],
    location: "Yuksom, Sikkim",
    lat: "27.3208",
    lng: "88.4278",
    description: "The oldest monastery in Sikkim offering insight into early Buddhist practices.",
    history: "Widely considered the first and oldest monastery in Sikkim, Dubdi was founded in 1701 by the followers of Lhatsun Chempo, immediately after the coronation of the first Chogyal. Its name translates to 'The Retreat'. Located on a scenic hilltop above Yuksom, it is a key part of the Buddhist pilgrimage circuit that begins in the former capital. The monastery was a hermitage for meditating lamas and its establishment marked the beginning of the consolidation of Buddhism in the region. Although small, its historical importance as the genesis of monastic life in Sikkim is immense.",
    architecture: "Traditional Tibetan-style with simple prayer halls.",
    spiritualSignificance: "Serves as a historical and spiritual landmark for early Buddhist teachings in Sikkim.",
    quickFacts: {
      established: "1701",
      sect: "Nyingma",
      monks: 30,
      altitude: "1,400 m"
    },
    visitorInfo: {
      hours: "8:00 AM - 4:00 PM",
      fees: "Free entry",
      itinerary: "1-2 hours",
      booking: "No booking needed"
    },
    festivals: ["Losar"]
  },
  {
    id: 7,
    name: "Ralang Monastery",
    image: ["/assets/Monastery/Monastery7/monastery7_1.jpg"],
    location: "Ralang, Sikkim",
    lat: "27.1500",
    lng: "88.5500",
    description: "Renowned for vibrant festivals and a peaceful environment.",
    history: "The original Ralang Monastery was founded in the 17th century by the 4th Chogyal, following his pilgrimage to Tibet. Legend holds that upon his return, the 9th Karmapa performed a blessing and threw grains of rice from his monastery in Tibet. The place where the grains landed was chosen as the site for the new monastery. A much larger and more modern structure, known as Palchen Choeling Monastic Institute, was built in the 1990s to accommodate the growing community of monks. Today, it stands as one of the most impressive monasteries in Sikkim, upholding the traditions of the Kagyu lineage.",
    architecture: "Stone and timber structures with colorful murals and stupas.",
    spiritualSignificance: "Important meditation and festival center in Sikkim.",
    quickFacts: {
      established: "17th century",
      sect: "Kagyu",
      monks: 60,
      altitude: "1,200 m"
    },
    visitorInfo: {
      hours: "8:00 AM - 4:30 PM",
      fees: "Free entry",
      itinerary: "1-2 hours",
      booking: "No booking needed"
    },
    festivals: ["Chaam Dance Festival", "Losar"]
  },
  {
    id: 8,
    name: "Sanga Choeling Monastery",
    image: ["/assets/Monastery/Monastery8/monastery8_1.jpg"],
    location: "Pelling, Sikkim",
    lat: "27.2927",
    lng: "88.2166",
    description: "A hidden gem perched on a ridge offering a serene spiritual atmosphere.",
    history: "Established in the 17th century by Lama Lhatsun Chempo, Sanga Choeling is one of the oldest monasteries in Sikkim, second only to Dubdi. Its name means 'The Island of Secret Teachings' or 'The Place of Secret Spells'. Accessible via a steep 40-minute trek, it was intentionally built in a secluded location to serve as a center for meditation and spiritual practice away from the populace. The monastery has endured fires and has been rebuilt over the centuries, but it still houses some ancient clay statues and paintings. It provides a truly serene atmosphere for spiritual seekers.",
    architecture: "Tibetan-style structures on a ridge with prayer halls and relics.",
    spiritualSignificance: "Important for meditation and spiritual retreats.",
    quickFacts: {
      established: "17th century",
      sect: "Nyingma",
      monks: 40,
      altitude: "2,000 m"
    },
    visitorInfo: {
      hours: "7:00 AM - 5:00 PM",
      fees: "Free entry",
      itinerary: "2-3 hours",
      booking: "No booking needed"
    },
    festivals: ["Losar", "Cham Dance Festival"]
  },
  {
    id: 9,
    name: "Phensang Monastery",
    image: ["/assets/Monastery/Monastery9/monastery9_1.jpg"],
    location: "Phensang, Sikkim",
    lat: "27.3300",
    lng: "88.5300",
    description: "A quiet retreat ideal for meditation and spiritual seekers.",
    history: "The Phensang Monastery was founded in 1721 by the third Lhatsun, Jigme Pawo. It belongs to the Nyingma school of Tibetan Buddhism. The monastery tragically burned down in 1947 but was rebuilt the following year through the dedicated efforts of the lamas. It is situated on a picturesque slope stretching from Kabi to Phodong and is renowned for having one of the largest communities of resident monks in Sikkim. The monastery is particularly famous for its annual festival held in December, where sacred masked dances (Chaam) are performed.",
    architecture: "Traditional Tibetan-style structures with prayer halls and murals.",
    spiritualSignificance: "Peaceful meditation center, attracting pilgrims and tourists.",
    quickFacts: {
      established: "18th century",
      sect: "Nyingma",
      monks: 30,
      altitude: "1,350 m"
    },
    visitorInfo: {
      hours: "8:00 AM - 4:00 PM",
      fees: "Free entry",
      itinerary: "1-2 hours",
      booking: "No booking needed"
    },
    festivals: ["Losar"]
  },
  {
    id: 10,
    name: "Lingdum Monastery",
    image: ["/assets/Monastery/Monastery10/monastery10_1.jpg"],
    location: "Ranka, Sikkim",
    lat: "27.3400",
    lng: "88.5700",
    description: "Blends traditional Buddhist architecture with modern spiritual practices.",
    history: "Also known as Ranka Monastery or Pal Zurmang Kagyud Monastery, Lingdum is a relatively modern monastery established in the late 1990s. It was founded under the guidance of the 12th Zurmang Gharwang Rinpoche. Although new, it is built in the traditional Tibetan architectural style and has quickly become a major attraction. The monastery serves as a vibrant center for the Zurmang Kagyu lineage, providing a comprehensive education to young monks. Its vast courtyard and serene environment make it a popular spot not only for pilgrims but also for tourists seeking tranquility.",
    architecture: "Modern Tibetan-style with large prayer halls, murals, and stupas.",
    spiritualSignificance: "Center for meditation, teachings, and spiritual retreats.",
    quickFacts: {
      established: "1990s",
      sect: "Kagyu",
      monks: 60,
      altitude: "1,350 m"
    },
    visitorInfo: {
      hours: "8:00 AM - 5:00 PM",
      fees: "Free entry",
      itinerary: "2-3 hours",
      booking: "No booking needed"
    },
    festivals: ["Losar", "Chaam Dance Festival"]
  },
  {
    id: 11,
    name: "Tsomgo Monastery",
    image: ["/assets/Monastery/Monastery11/monastery11_1.jpg"],
    location: "Tsomgo Lake, Sikkim",
    lat: "27.5400",
    lng: "88.8200",
    description: "Near scenic Tsomgo Lake, popular with pilgrims and tourists.",
    history: "This small monastery is located near the highly sacred Tsomgo Lake, a glacial lake revered by the local Sikkimese people. The history of the monastery is intrinsically linked to the spiritual significance of the lake itself. Tsomgo Lake is believed to possess healing powers, and in ancient times, faith healers known as Jhakris would use its waters to forecast the future. The monastery was built to serve the spiritual needs of the pilgrims and locals who visit this holy site. It functions as a place of worship and a tranquil stop for visitors en route to the Nathu La Pass, offering blessings in a breathtaking high-altitude setting.",
    architecture: "Traditional Tibetan-style with small shrines and prayer halls.",
    spiritualSignificance: "Important for lake rituals and Tibetan Buddhist teachings.",
    quickFacts: {
      established: "1910",
      sect: "Nyingma",
      monks: 30,
      altitude: "3,780 m"
    },
    visitorInfo: {
      hours: "7:00 AM - 5:00 PM",
      fees: "₹50 per person",
      itinerary: "2 hours",
      booking: "No booking needed"
    },
    festivals: ["Losar"]
  },
  {
    id: 12,
    name: "Zong Dog Palri Monastery",
    image: ["/assets/Monastery/Monastery12/monastery12_1.jpg"],
    location: "Ravangla, Sikkim",
    lat: "27.1300",
    lng: "88.4000",
    description: "Stunning example of Tibetan architecture, offering spiritual teachings and scenic beauty.",
    history: "More commonly known as the Buddha Park of Ravangla, this site was consecrated in 2013 by the 14th Dalai Lama. Its construction was a state government project initiated in 2006 to commemorate the 2550th birth anniversary of Lord Buddha. The location in Ravangla was chosen as it is already part of a religious pilgrimage circuit. The park's centerpiece, a towering 130-foot statue of the Buddha, has quickly turned it into a major pilgrimage destination. The complex, officially named Tathagata Tsal, aims to promote peace, religious tourism, and spiritual well-being in the region.",
    architecture: "Large, golden-roofed monastery with traditional murals and sculptures.",
    spiritualSignificance: "Serves as a major pilgrimage site and teaching center.",
    quickFacts: {
      established: "1995",
      sect: "Nyingma",
      monks: 100,
      altitude: "2,100 m"
    },
    visitorInfo: {
      hours: "9:00 AM - 5:00 PM",
      fees: "Free entry",
      itinerary: "2-3 hours",
      booking: "No booking needed"
    },
    festivals: ["Losar", "Saga Dawa"]
  },
  {
    id: 13,
    name: "Buddha Park of Ravangla",
    image: ["/assets/Monastery/Monastery13/monastery13_1.jpg"],
    location: "Phodong, Sikkim",
    lat: "27.1000",
    lng: "88.4300",
    description: "A serene park with a large Buddha statue surrounded by gardens and meditation spaces.",
    history: "The Buddha Park, officially known as Tathagata Tsal, was conceptualized to mark the 2550th birth anniversary of Gautama Buddha. Construction began in 2006 and the park was consecrated by the 14th Dalai Lama in 2013. This ambitious project by the Sikkim government aimed to create a major pilgrimage and tourist destination. The park's central feature is a massive 130-foot statue of the Sakyamuni Buddha, which is visible from miles away. The site also includes a museum, meditation center, and beautifully landscaped gardens, making it a modern hub for peace and spiritual reflection.",
    architecture: "Modern park layout with a 130-ft Buddha statue and landscaped gardens.",
    spiritualSignificance: "Center for meditation, peace, and community gatherings.",
    quickFacts: {
      established: "2006",
      sect: "Mahayana",
      monks: 10,
      altitude: "2,000 m"
    },
    visitorInfo: {
      hours: "6:00 AM - 6:00 PM",
      fees: "₹50 per person",
      itinerary: "2-3 hours",
      booking: "No booking needed"
    },
    festivals: ["Buddha Jayanti"]
  },
  {
    id: 14,
    name: "Namchi Monastery",
    image: ["/assets/Monastery/Monastery14/monastery14_1.jpg"],
    location: "Namchi, Sikkim",
    lat: "27.1500",
    lng: "88.5300",
    description: "A spiritual retreat known for its peaceful ambiance and community involvement.",
    history: "While Namchi has several religious sites, the main monastery is Serdup Choling Monastery. It was originally built in 1960 and has since become a significant spiritual center in South Sikkim. However, the religious landscape of Namchi was transformed with the construction of the Samdruptse Hill complex in the late 1990s. This complex features a colossal 135-foot statue of Guru Padmasambhava, the patron saint of Sikkim. This monumental project turned Namchi into a major pilgrimage destination, complementing the older monasteries and reinforcing the region's deep Buddhist heritage.",
    architecture: "Modern Tibetan-style monastery with murals, stupas, and prayer halls.",
    spiritualSignificance: "Serves as a center for meditation and community spiritual programs.",
    quickFacts: {
      established: "1990s",
      sect: "Nyingma",
      monks: 40,
      altitude: "1,200 m"
    },
    visitorInfo: {
      hours: "8:00 AM - 5:00 PM",
      fees: "Free entry",
      itinerary: "1-2 hours",
      booking: "No booking needed"
    },
    festivals: ["Losar", "Saga Dawa"]
  },
  {
    id: 15,
    name: "Gurudongmar Monastery",
    image: ["/assets/Monastery/Monastery15/monastery15_1.jpg"],
    location: "North Sikkim",
    lat: "27.9900",
    lng: "88.5800",
    description: "Located at high altitude, revered for spiritual sanctity and breathtaking views.",
    history: "The monastery is a small shrine located beside the sacred Gurudongmar Lake, one of the highest lakes in the world. The site's history is deeply rooted in the legend of Guru Padmasambhava, who visited this place in the 8th century during his journey to Tibet. It is said that the local people appealed to him for a source of drinking water during the harsh winters. The Guru obliged by touching a part of the lake, which has miraculously never frozen since. The monastery was built to commemorate this event and serves as a place of worship for pilgrims and the Indian Army personnel stationed there, who revere the site's sanctity.",
    architecture: "Simple Tibetan-style monastery with small prayer halls and stupas.",
    spiritualSignificance: "Spiritual retreat and sacred site for high-altitude Buddhist practices.",
    quickFacts: {
      established: "17th century",
      sect: "Lamaist",
      monks: 20,
      altitude: "5,430 m"
    },
    visitorInfo: {
      hours: "6:00 AM - 4:00 PM",
      fees: "Free entry",
      itinerary: "Half-day visit",
      booking: "No booking needed"
    },
    festivals: ["Losar"]
  },
  {
    id: 16,
    name: "Khecheopalri Monastery",
    image: ["/assets/Monastery/Monastery16/monastery16_1.jpg"],
    location: "Khecheopalri Lake, Sikkim",
    lat: "27.2900",
    lng: "88.5500",
    description: "Famous for its sacred lake, attracting pilgrims seeking blessings and spiritual renewal.",
    history: "The monastery is situated just above the sacred Khecheopalri Lake. The history of this site is intertwined with ancient legends and beliefs. The lake is revered as a wish-fulfilling lake by both Buddhists and Hindus. According to folklore, the lake is a footprint of the goddess Tara (for Buddhists) or Lord Shiva (for Hindus). The monastery was established to serve the many pilgrims who visit this sacred water body. It is remarkable that despite being surrounded by dense forest, no leaves are ever seen floating on the lake's surface, as it is believed that birds immediately pick them up, maintaining its purity.",
    architecture: "Traditional Tibetan-style structures with prayer halls and intricate carvings.",
    spiritualSignificance: "Pilgrimage site with rituals connected to the sacred lake and local deities.",
    quickFacts: {
      established: "17th century",
      sect: "Nyingma",
      monks: 30,
      altitude: "1,300 m"
    },
    visitorInfo: {
      hours: "7:00 AM - 5:00 PM",
      fees: "Free entry",
      itinerary: "2 hours",
      booking: "No booking needed"
    },
    festivals: ["Losar", "Saga Dawa"]
  }
];

const places = [
  // Rumtek Monastery
  { id: 1, monasteryId: 1, name: "Rumtek Grand Hotel", type: "Hotel", lat: "27.3340", lng: "88.6120" },
  { id: 2, monasteryId: 1, name: "Peaceful Retreat Hotel", type: "Hotel", lat: "27.3350", lng: "88.6130" },
  { id: 3, monasteryId: 1, name: "Kanchenjunga View Hotel", type: "Hotel", lat: "27.3360", lng: "88.6115" },
  { id: 4, monasteryId: 1, name: "Mountain Breeze Hotel", type: "Hotel", lat: "27.3335", lng: "88.6105" },
  { id: 5, monasteryId: 1, name: "Trekker's Inn", type: "Hotel", lat: "27.3325", lng: "88.6125" },
  { id: 6, monasteryId: 1, name: "Rumtek Trek Spot 1", type: "Trekking", lat: "27.3380", lng: "88.6150" },
  { id: 7, monasteryId: 1, name: "Rumtek Trek Spot 2", type: "Trekking", lat: "27.3310", lng: "88.6080" },

  // Pemayangtse Monastery
  { id: 8, monasteryId: 2, name: "Pemayangtse Resort", type: "Hotel", lat: "27.3290", lng: "88.2750" },
  { id: 9, monasteryId: 2, name: "Mountain View Hotel", type: "Hotel", lat: "27.3285", lng: "88.2745" },
  { id: 10, monasteryId: 2, name: "Pema Inn", type: "Hotel", lat: "27.3275", lng: "88.2760" },
  { id: 11, monasteryId: 2, name: "Skyline Hotel", type: "Hotel", lat: "27.3265", lng: "88.2735" },
  { id: 12, monasteryId: 2, name: "Trekking Pemayangtse 1", type: "Trekking", lat: "27.3305", lng: "88.2770" },
  { id: 13, monasteryId: 2, name: "Trekking Pemayangtse 2", type: "Trekking", lat: "27.3280", lng: "88.2780" },

  // Tashiding Monastery
  { id: 14, monasteryId: 3, name: "Tashiding Hilltop Hotel", type: "Hotel", lat: "27.3310", lng: "88.3820" },
  { id: 15, monasteryId: 3, name: "Valley View Hotel", type: "Hotel", lat: "27.3320", lng: "88.3805" },
  { id: 16, monasteryId: 3, name: "Sacred Hills Hotel", type: "Hotel", lat: "27.3305", lng: "88.3815" },
  { id: 17, monasteryId: 3, name: "Trekking Tashiding 1", type: "Trekking", lat: "27.3330", lng: "88.3830" },
  { id: 18, monasteryId: 3, name: "Trekking Tashiding 2", type: "Trekking", lat: "27.3290", lng: "88.3790" },

  // Phodang Monastery
  { id: 19, monasteryId: 4, name: "Phodang Retreat Hotel", type: "Hotel", lat: "27.2290", lng: "88.5340" },
  { id: 20, monasteryId: 4, name: "Serenity Hotel", type: "Hotel", lat: "27.2280", lng: "88.5325" },
  { id: 21, monasteryId: 4, name: "Mountain View Phodang", type: "Hotel", lat: "27.2300", lng: "88.5335" },
  { id: 22, monasteryId: 4, name: "Phodang Trek Spot 1", type: "Trekking", lat: "27.2310", lng: "88.5350" },
  { id: 23, monasteryId: 4, name: "Phodang Trek Spot 2", type: "Trekking", lat: "27.2270", lng: "88.5310" },

  // Enchey Monastery
  { id: 24, monasteryId: 5, name: "Gangtok Luxury Hotel", type: "Hotel", lat: "27.3395", lng: "88.6075" },
  { id: 25, monasteryId: 5, name: "Enchey View Hotel", type: "Hotel", lat: "27.3385", lng: "88.6055" },
  { id: 26, monasteryId: 5, name: "Himalayan Heights Hotel", type: "Hotel", lat: "27.3375", lng: "88.6060" },
  { id: 27, monasteryId: 5, name: "Enchey Trek Spot 1", type: "Trekking", lat: "27.3400", lng: "88.6085" },
  { id: 28, monasteryId: 5, name: "Enchey Trek Spot 2", type: "Trekking", lat: "27.3360", lng: "88.6040" },

  // Dubdi Monastery
  { id: 29, monasteryId: 6, name: "Yuksom Mountain Hotel", type: "Hotel", lat: "27.3215", lng: "88.4285" },
  { id: 30, monasteryId: 6, name: "Dubdi View Hotel", type: "Hotel", lat: "27.3205", lng: "88.4275" },
  { id: 31, monasteryId: 6, name: "Dubdi Trek Spot 1", type: "Trekking", lat: "27.3220", lng: "88.4300" },
  { id: 32, monasteryId: 6, name: "Dubdi Trek Spot 2", type: "Trekking", lat: "27.3195", lng: "88.4260" },

  // Ralang Monastery
  { id: 33, monasteryId: 7, name: "Ralang Hilltop Hotel", type: "Hotel", lat: "27.1510", lng: "88.5510" },
  { id: 34, monasteryId: 7, name: "Peaceful Ralang Hotel", type: "Hotel", lat: "27.1520", lng: "88.5520" },
  { id: 35, monasteryId: 7, name: "Ralang Trek Spot 1", type: "Trekking", lat: "27.1505", lng: "88.5505" },
  { id: 36, monasteryId: 7, name: "Ralang Trek Spot 2", type: "Trekking", lat: "27.1495", lng: "88.5495" },

  // Sanga Choeling Monastery
  { id: 37, monasteryId: 8, name: "Pelling Viewpoint Hotel", type: "Hotel", lat: "27.2930", lng: "88.2170" },
  { id: 38, monasteryId: 8, name: "Sanga Choeling Trek Spot 1", type: "Trekking", lat: "27.2940", lng: "88.2180" },
  { id: 39, monasteryId: 8, name: "Sanga Choeling Trek Spot 2", type: "Trekking", lat: "27.2925", lng: "88.2165" },

  // Phensang Monastery
  { id: 40, monasteryId: 9, name: "Phensang Retreat Hotel", type: "Hotel", lat: "27.3310", lng: "88.5310" },
  { id: 41, monasteryId: 9, name: "Phensang Trek Spot 1", type: "Trekking", lat: "27.3320", lng: "88.5320" },
  { id: 42, monasteryId: 9, name: "Phensang Trek Spot 2", type: "Trekking", lat: "27.3300", lng: "88.5300" },

  // Lingdum Monastery
  { id: 43, monasteryId: 10, name: "Lingdum View Hotel", type: "Hotel", lat: "27.3410", lng: "88.5710" },
  { id: 44, monasteryId: 10, name: "Lingdum Trek Spot 1", type: "Trekking", lat: "27.3420", lng: "88.5720" },
  { id: 45, monasteryId: 10, name: "Lingdum Trek Spot 2", type: "Trekking", lat: "27.3400", lng: "88.5700" },

  // Tsomgo Monastery
  { id: 46, monasteryId: 11, name: "Tsomgo Lake Resort", type: "Hotel", lat: "27.5410", lng: "88.8210" },
 
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

app.get('/api/monasteries/:name', (req, res) => {
  const { name } = req.params;
  const monastery = monasteries.find(
    m => m.name.toLowerCase() === decodeURIComponent(name).toLowerCase()
  );

  if (!monastery) {
    return res.status(404).json({ error: "Festival not found" });
  }

  res.json(monastery);
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


app.get("/api/places", (req, res) => {
  const { monasteryId } = req.query;

  if (!monasteryId) {
    return res.json([]);
  }

  const nearbyPlaces = places.filter(
    p => Number(p.monasteryId) === Number(monasteryId)
  );

  res.json(nearbyPlaces);
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

app.post("/chat", (req, res) => {
  const { message } = req.body;
  const msg = message.toLowerCase().replace(/[.,!?]/g, "").trim();
  let reply = "";

  const monastery = monasteries.find(m => msg.includes(m.name.toLowerCase()));
  const festival = festivals.find(f => {
    const name = f.name.toLowerCase();
    return msg.includes(name) || msg.includes(name + " festival");
  });

  if (monastery) {
    if (msg.includes("where")) {
      reply = `${monastery.name} is located at ${monastery.location} (Coordinates: ${monastery.lat}°N, ${monastery.lng}°E).`;
    } else if (msg.includes("history") || msg.includes("background")) {
      reply = `${monastery.name}: ${monastery.description}`;
    } else if (msg.includes("volunteer") || msg.includes("activities")) {
      const vol = volunteermonasteries.find(v => v.monasteryId === monastery.id);
      reply = vol
        ? `You can volunteer at ${monastery.name}. Activities: ${vol.activities}. Contact: ${vol.phone}, ${vol.email}`
        : `Volunteering info for ${monastery.name} is not available.`;
    } else {
      reply = `${monastery.name}: ${monastery.description}`;
    }
  } else if (festival) {
    if (msg.includes("history") || msg.includes("origin")) {
      reply = `${festival.name} history: ${festival.history_origins}`;
    } else if (msg.includes("ritual") || msg.includes("practice")) {
      reply = `${festival.name} rituals: ${festival.rituals_practices.join(", ")}`;
    } else if (msg.includes("cultural") || msg.includes("significance")) {
      reply = `${festival.name} cultural significance: ${festival.cultural_significance}`;
    } else {
      reply = `${festival.name}: ${festival.description}`;
    }
  } else if (msg.includes("monastery") || msg.includes("monasteries")) {
    reply = `Sikkim has many monasteries. Famous ones include Rumtek, Pemayangtse, Tashiding, and Enchey.`;
  } else if (msg.includes("festival")) {
    reply = `Popular festivals include Pang Lhabsol, Losar, Saga Dawa, Namsoong, and Losoong.`;
  } else if (msg.includes("volunteer")) {
    reply = `You can volunteer at Rumtek, Pemayangtse, Tashiding, or Enchey Monastery.`;
  } else if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Hello 👋! You can ask me about monasteries, festivals, or volunteer opportunities in Sikkim.";
  } else {
    reply = "I’m not sure about that. You can ask me about Sikkim’s monasteries, festivals, or volunteering opportunities.";
  }

  res.json({ reply });
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



