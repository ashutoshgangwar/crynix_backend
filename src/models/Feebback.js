const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    cryRecord: { type: mongoose.Schema.Types.ObjectId, ref: 'CryRecord' },
    selectedOptions: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
