const mongoose = require('mongoose');

const markerPictureSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  marker: {
    type: mongoose.ObjectId,
    ref: 'Marker',
  },
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
  }
 });


const MarkerPicture = mongoose.model('markerpictures', markerPictureSchema);

module.exports = MarkerPicture;
