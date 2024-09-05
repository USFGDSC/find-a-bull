const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uNumber: { type: String, unique: true, required: true },
  email: { type: String, required: false },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create an index for uNumber to ensure uniqueness
userSchema.index({ uNumber: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
