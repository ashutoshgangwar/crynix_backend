const mongoose = require('mongoose');

const cryRecordSchema = new mongoose.Schema(
  {
    baby: { type: mongoose.Schema.Types.ObjectId, ref: 'Baby' },
    cryType: String,
    confidence: Number,
    meaning: String,
    audioUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('CryRecord', cryRecordSchema);
