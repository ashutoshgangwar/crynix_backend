const BabyCry = require('../models/BabyCry');
const path = require('path');

exports.createBabyCry = async (req, res) => {
  try {
    const { babyId, duration } = req.body;

    if (!babyId || !duration || !req.file) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCry = new BabyCry({
      user: req.userId,
      baby: babyId,
      audioUrl: `/uploads/${req.file.filename}`, // store relative URL
      duration,
      createdAt: new Date(),
    });

    await newCry.save();

    res.status(201).json({ message: 'Baby cry saved successfully', data: newCry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBabyCries = async (req, res) => {
  try {
    const { babyId } = req.query;
    if (!babyId) return res.status(400).json({ message: 'babyId is required' });

    const cries = await BabyCry.find({ baby: babyId, user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ data: cries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
