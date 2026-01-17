const BabyCry = require('../models/BabyCry');
const path = require('path');
const axios = require('axios'); // Ensure axios is installed

// Create a new baby cry record
exports.createBabyCry = async (req, res) => {
  try {
    console.log("Incoming request to create baby cry:", req.body);

    const { babyId, duration } = req.body;
    if (!babyId || !duration || !req.file) {
      console.warn("Missing required fields");
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCry = new BabyCry({
      user: req.userId,
      baby: babyId,
      audioUrl: `/uploads/${req.file.filename}`,
      duration,
      createdAt: new Date(),
    });

    await newCry.save();
    console.log("Baby cry saved:", newCry);

    // Immediately analyze the audio using Python AI
    const audioPath = path.join(__dirname, '..', 'uploads', req.file.filename); // full local path
    console.log("Sending local audio path to Python AI:", audioPath);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/analyze', // Python AI server URL
        { path: audioPath },
        { timeout: 15000 }
      );

      const prediction = response.data.prediction;
      console.log("Prediction from Python AI:", prediction);

      newCry.prediction = prediction || "unknown";
      await newCry.save();
      console.log("Saved prediction to MongoDB");

    } catch (aiErr) {
      console.error("Error calling Python AI service:", aiErr.response?.data || aiErr.message);
    }

    res.status(201).json({ message: 'Baby cry saved successfully', data: newCry });

  } catch (err) {
    console.error("Error creating baby cry:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all baby cries for a specific baby
exports.getBabyCries = async (req, res) => {
  try {
    const { babyId } = req.query;
    if (!babyId) return res.status(400).json({ message: 'babyId is required' });

    const cries = await BabyCry.find({ baby: babyId, user: req.userId }).sort({ createdAt: -1 });
    console.log(`Found ${cries.length} cries for babyId ${babyId}`);

    res.status(200).json({ data: cries });

  } catch (err) {
    console.error("Error fetching baby cries:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Analyze the latest baby cry manually (optional)
exports.analyzeLatestBabyCry = async (req, res) => {
  try {
    const { babyId } = req.query;
    if (!babyId) return res.status(400).json({ message: 'babyId is required' });

    const latestCry = await BabyCry.findOne({ baby: babyId, user: req.userId }).sort({ createdAt: -1 });
    if (!latestCry) return res.status(404).json({ message: 'No baby cry found' });

    const audioPath = path.join(__dirname, '..', latestCry.audioUrl);
    console.log("Sending local audio path to Python AI:", audioPath);

    const response = await axios.post('http://127.0.0.1:8000/analyze', { url: audioPath }, { timeout: 15000 });
    console.log("Python AI response:", response.data);
    const prediction = response.data.prediction;
    console.log("Prediction from Python AI:", prediction);

    latestCry.prediction = prediction || "unknown";
    await latestCry.save();
    console.log("Saved prediction to MongoDB");

    res.json({ babyCry: latestCry, prediction });

  } catch (err) {
    console.error("Error analyzing baby cry:", err.response?.data || err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
