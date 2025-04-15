import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/potato-mood', async (req, res) => {
  try {
    const adviceRes = await fetch('https://api.adviceslip.com/advice');
    const adviceData = await adviceRes.json();
    const advice = adviceData.slip.advice;

    const potatoImages = [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Potato_with_sprouts.jpg/800px-Potato_with_sprouts.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Russet_potato.jpg/800px-Russet_potato.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Potato.jpg/800px-Potato.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Purple_potato.jpg/800px-Purple_potato.jpg"
    ];

    const randomPotato = potatoImages[Math.floor(Math.random() * potatoImages.length)];

    res.json({
      advice,
      potato: randomPotato
    });
  } catch (err) {
    res.status(500).json({ error: "API Error" });
  }
});

app.listen(PORT, () => console.log(`🟢 Listening on http://localhost:${PORT}`));
