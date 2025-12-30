const mongoose = require('mongoose');

const babySchema = new mongoose.Schema({
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  feedingType: { type: String, enum: ['BreastMilk', 'Formula', 'Both'], required: true },
  dateOfBirth: { type: Date, required: true },
  birthWeight: { type: Number, required: true },
  currentWeight: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Baby', babySchema);
