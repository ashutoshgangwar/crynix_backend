const Baby = require('../models/Baby');

// Create a new baby profile
exports.createBaby = async (req, res) => {
  try {
    const { name, gender, dateOfBirth, birthWeight, currentWeight, feedingType } = req.body;

    if (!name || !gender || !dateOfBirth || !birthWeight || !currentWeight || !feedingType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const baby = await Baby.create({
      parent: req.userId, // middleware attaches userId
      name,
      gender,
      dateOfBirth,
      birthWeight,
      currentWeight,
      feedingType,
    });

    res.status(201).json({ message: 'Baby profile created successfully', baby });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all babies for a user
exports.getBabies = async (req, res) => {
  try {
    const babies = await Baby.find({ parent: req.userId });
    res.json(babies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
