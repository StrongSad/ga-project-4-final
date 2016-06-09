var mongoose = require('mongoose');

var TripSchema = new mongoose.Schema({
  userLocation: String,
  userDestination: String,
  startDate: Date,
  endDate: Date,
  seatsAvailable: Number,
  description: String,
  messages: [{
    username: String,
    comment: String
  }]
});

module.exports = mongoose.model('Trip', TripSchema);
