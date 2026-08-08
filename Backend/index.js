require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

const Monastery = require('./models/Monastery');
const Festival = require('./models/Festival');
const Place = require('./models/Place');
const Volunteer = require('./models/Volunteer');
const Event = require('./models/Event');
const Media = require('./models/Media');
const Scene = require('./models/Scene');

const multer = require('multer');
const path = require('path');
const { uploadFile } = require('./utils/gcs');
const { getThumbnail, buildManifest, buildImageUrl } = require('./utils/iiif');

const upload = multer({ dest: path.join(__dirname, 'uploads/') });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/assets', express.static('assets'));

mongoose.connect(process.env.MONGO_URI)
  .then((conn) => console.log(`MongoDB connected: ${conn.connection.host}`))
  .catch((err) => { console.error(`MongoDB connection error: ${err.message}`); process.exit(1); });

app.get('/api/monasteries', async (req, res) => {
  try {
    const monasteries = await Monastery.find().sort({ name: 1 });
    res.json(monasteries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch monasteries' });
  }
});

app.get('/api/monasteries/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const monastery = await Monastery.findOne({
      name: { $regex: new RegExp(`^${decodeURIComponent(name)}$`, 'i') },
    });

    if (!monastery) {
      return res.status(404).json({ error: 'Monastery not found' });
    }
    res.json(monastery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch monastery' });
  }
});

app.get('/api/festivals', async (req, res) => {
  try {
    const festivals = await Festival.find().sort({ name: 1 });
    res.json(festivals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch festivals' });
  }
});

app.get('/api/festivals/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const festival = await Festival.findOne({
      name: { $regex: new RegExp(`^${decodeURIComponent(name)}$`, 'i') },
    });

    if (!festival) {
      return res.status(404).json({ error: 'Festival not found' });
    }
    res.json(festival);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch festival' });
  }
});

app.get('/api/places', async (req, res) => {
  try {
    const { monasteryId } = req.query;
    if (!monasteryId) return res.json([]);

    const nearbyPlaces = await Place.find({ monasteryId }).sort({ type: 1, name: 1 });
    res.json(nearbyPlaces);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

app.get('/api/volunteer', async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate('monasteryId', 'name location image description');

    const combined = volunteers.map((vol) => ({
      monasteryId: vol.monasteryId?._id,
      activities: vol.activities,
      phone: vol.phone,
      email: vol.email,
      name: vol.monasteryId?.name || 'Unknown',
      location: vol.monasteryId?.location || 'Unknown',
      image: vol.monasteryId?.image || '/assets/default.jpg',
      description: vol.monasteryId?.description || '',
    }));

    res.json(combined);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch volunteer info' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const { month, year } = req.query;
    let filter = {};

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      filter = { startDate: { $gte: start, $lte: end } };
    }

    const events = await Event.find(filter)
      .populate('festivalId', 'name')
      .populate('monasteryId', 'name location')
      .sort({ startDate: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.get('/api/media', async (req, res) => {
  try {
    const { type, monasteryId, festivalId } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (monasteryId) filter.relatedMonastery = monasteryId;
    if (festivalId) filter.relatedFestival = festivalId;

    const media = await Media.find(filter)
      .populate('relatedMonastery', 'name')
      .populate('relatedFestival', 'name')
      .sort({ createdAt: -1 });

    res.json(media);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const msg = message.toLowerCase().replace(/[.,!?]/g, '').trim();
    let reply = '';

    const monasteries = await Monastery.find();
    const festivals = await Festival.find();
    const volunteers = await Volunteer.find();

    const monastery = monasteries.find((m) => msg.includes(m.name.toLowerCase()));
    const festival = festivals.find((f) => {
      const name = f.name.toLowerCase();
      return msg.includes(name) || msg.includes(name + ' festival');
    });

    if (monastery) {
      if (msg.includes('where')) {
        reply = `${monastery.name} is located at ${monastery.location} (Coordinates: ${monastery.lat}°N, ${monastery.lng}°E).`;
      } else if (msg.includes('history') || msg.includes('background')) {
        reply = `${monastery.name}: ${monastery.description}`;
      } else if (msg.includes('volunteer') || msg.includes('activities')) {
        const vol = volunteers.find((v) => String(v.monasteryId) === String(monastery._id));
        reply = vol
          ? `You can volunteer at ${monastery.name}. Activities: ${vol.activities}. Contact: ${vol.phone}, ${vol.email}`
          : `Volunteering info for ${monastery.name} is not available.`;
      } else {
        reply = `${monastery.name}: ${monastery.description}`;
      }
    } else if (festival) {
      if (msg.includes('history') || msg.includes('origin')) {
        reply = `${festival.name} history: ${festival.history_origins}`;
      } else if (msg.includes('ritual') || msg.includes('practice')) {
        reply = `${festival.name} rituals: ${festival.rituals_practices.join(', ')}`;
      } else if (msg.includes('cultural') || msg.includes('significance')) {
        reply = `${festival.name} cultural significance: ${festival.cultural_significance}`;
      } else {
        reply = `${festival.name}: ${festival.description}`;
      }
    } else if (msg.includes('monastery') || msg.includes('monasteries')) {
      reply = 'Sikkim has many monasteries. Famous ones include Rumtek, Pemayangtse, Tashiding, and Enchey.';
    } else if (msg.includes('festival')) {
      reply = 'Popular festivals include Pang Lhabsol, Losar, Saga Dawa, Namsoong, and Losoong.';
    } else if (msg.includes('volunteer')) {
      reply = 'You can volunteer at Rumtek, Pemayangtse, Tashiding, or Enchey Monastery.';
    } else if (msg.includes('hello') || msg.includes('hi')) {
      reply = 'Hello! You can ask me about monasteries, festivals, or volunteer opportunities in Sikkim.';
    } else {
      reply = "I'm not sure about that. You can ask me about Sikkim's monasteries, festivals, or volunteering opportunities.";
    }

    res.json({ reply });
  } catch (error) {
    res.status(500).json({ reply: 'Sorry, something went wrong. Please try again.' });
  }
});

app.get('/api/monasteries/:id/scenes', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid monastery ID' });
    }
    const scenes = await Scene.find({ monasteryId: id }).sort({ order: 1 });
    res.json(scenes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scenes' });
  }
});

app.get('/api/scenes/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const scene = await Scene.findOne({ slug: slug.toLowerCase() });
    if (!scene) {
      return res.status(404).json({ error: 'Scene not found' });
    }
    res.json(scene);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scene' });
  }
});

app.get('/api/monasteries/:id/media', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid monastery ID' });
    }
    const { type } = req.query;
    const filter = { relatedMonastery: id };
    if (type) filter.type = type;

    const media = await Media.find(filter).sort({ createdAt: -1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

app.get('/api/media/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid media ID' });
    }
    const media = await Media.findById(id)
      .populate('relatedMonastery', 'name')
      .populate('relatedFestival', 'name');
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

app.post('/api/media/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const { title, type, monasteryId, festivalId, width, height } = req.body;

    if (!title || !type) {
      return res.status(400).json({ error: 'Title and type are required' });
    }

    if (!['image', 'video', 'panorama'].includes(type)) {
      return res.status(400).json({ error: 'Type must be image, video, or panorama' });
    }

    const ext = path.extname(req.file.originalname);
    const safeFilename = `${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const folder = monasteryId ? `monasteries/${monasteryId}` : 'general';
    const typeFolder = type === 'panorama' ? '360' : type === 'image' ? 'images' : 'videos';
    const destination = `${folder}/${typeFolder}/${safeFilename}`;

    const gcsUrl = await uploadFile(req.file.path, destination);

    const identifier = destination.replace(ext, '');
    const thumbnailUrl = (type === 'image' || type === 'panorama')
      ? getThumbnail(identifier, 300)
      : '';

    const iiifManifestUrl = monasteryId
      ? `${req.protocol}://${req.get('host')}/api/iiif/manifest/${monasteryId}`
      : '';

    const media = await Media.create({
      title,
      type,
      originalUrl: req.file.originalname,
      gcsUrl,
      thumbnailUrl,
      iiifManifestUrl,
      metadata: {
        width: parseInt(width) || 0,
        height: parseInt(height) || 0,
        format: ext.replace('.', ''),
        size: req.file.size || 0,
      },
      relatedMonastery: monasteryId || null,
      relatedFestival: festivalId || null,
    });

    const fs = require('fs');
    fs.unlink(req.file.path, () => {});

    res.status(201).json(media);
  } catch (error) {
    console.error('Media upload error:', error.message);
    res.status(500).json({ error: 'Failed to upload media' });
  }
});

app.get('/api/iiif/manifest/:monasteryId', async (req, res) => {
  try {
    const { monasteryId } = req.params;
    if (!monasteryId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid monastery ID' });
    }

    const monastery = await Monastery.findById(monasteryId);
    if (!monastery) {
      return res.status(404).json({ error: 'Monastery not found' });
    }

    const mediaItems = await Media.find({
      relatedMonastery: monasteryId,
      type: { $in: ['image', 'panorama'] },
    }).sort({ createdAt: -1 });

    const manifestId = `${req.protocol}://${req.get('host')}/api/iiif/manifest/${monasteryId}`;

    const items = mediaItems.map((m) => {
      const identifier = m.gcsUrl
        ? m.gcsUrl.replace(/^https:\/\/storage\.googleapis\.com\/[^/]+\//, '')
        : m.title;
      return {
        identifier,
        width: m.metadata?.width || 1024,
        height: m.metadata?.height || 768,
      };
    });

    const manifest = buildManifest({
      id: manifestId,
      label: `${monastery.name} — Image Collection`,
      items,
    });

    res.json(manifest);
  } catch (error) {
    console.error('IIIF manifest error:', error.message);
    res.status(500).json({ error: 'Failed to generate manifest' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
