const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    plan: String,
    isActive: Boolean,
    expiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
