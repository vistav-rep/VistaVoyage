const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
    trim: true
  },
  lastName: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  location: {
    type: String,
    required: false
  },
  updates: {
    type: Boolean,
    default: false
  },
  terms: {
    type: Boolean,
    required: false,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Newsletter', newsletterSchema);
