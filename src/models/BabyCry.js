const mongoose = require('mongoose');

const babyCrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    baby: { type: mongoose.Schema.Types.ObjectId, ref: 'Baby', required: true },
    audioUrl: { type: String, required: true }, // path or URL to uploaded audio
    prediction: { type: String, default: null },
    duration: { type: String, required: true }, // format "00:30"
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BabyCry', babyCrySchema);
