
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  uploaded_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', imageSchema);
