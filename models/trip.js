var mongoose = require('mongoose');
// don't think I need this
//var Schema = mongoose.Schema;

var TripSchema = new mongoose.Schema({
  from: String,
  to: String,
  startDate: Date,
  endDate: Date,
  description: String,
  messages: [{
    username: String,
    comment: String
  }]
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;