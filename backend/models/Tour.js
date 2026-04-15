const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // Default/Base price
  seasonalPrices: [{
    season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season' },
    price: { type: Number, required: true }
  }],
  duration: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String },
  tag: { type: String },
  itinerary: [{
    day: Number,
    title: String,
    description: String
  }],
  inclusions: [String],
  exclusions: [String]
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);
