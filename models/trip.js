var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new mongoose.Schema({
  from: String,
  to: String,
  startDate: String,
  endDate: String,
  description: String,
  messages: [{
    username: String,
    comment: String
  }]
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;