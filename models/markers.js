const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  title: String,
  categorie: {
    title: String
  },
  latitude: Number,
  longitude: Number,
  isFavorite: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
  }
});


const Marker = mongoose.model('markers', markerSchema);

module.exports = Marker;
