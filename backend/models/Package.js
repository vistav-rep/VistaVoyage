const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: String, required: true },
  transport: { type: String },
  mealPlan: { type: String },
  price: { type: Number, required: true },
  featured: { type: Boolean, default: false },
  season: { type: String },
  images: [{ type: String }],
  overview: { type: String },
  itinerary: [{
    day: { type: Number },
    title: { type: String },
    description: { type: String }
  }],
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  hotelInfo: { type: String },
  category: { type: String }, // For filtering
  netCost: { type: Number },
  profit: { type: Number }
}, { timestamps: true });

packageSchema.index({ title: 'text', destination: 'text', hotelInfo: 'text' });

module.exports = mongoose.model('Package', packageSchema);
