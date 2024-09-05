const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemName: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['lost', 'found'], required: true },
    foundLocation: { type: String },
    depositLocation: { type: String },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  // Create indexes for efficient searching
  itemSchema.index({ itemName: 1 });
  itemSchema.index({ status: 1 });
  itemSchema.index({ foundLocation: 1 });
  itemSchema.index({ depositLocation: 1 });
  
  const Item = mongoose.model('Item', itemSchema);
  module.exports = Item;
  
  