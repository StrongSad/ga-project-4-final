var mongoose = require('mongoose');
var bcyrpt = require('bcrypt');
var Schema = mongoose.Schema;


var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true},
  trips: [{ type:Schema.ObjectId, ref:"trip", childPath:"children" }]
});

UserSchema.methods.sayHello = function() {
  return 'Hi ' + this.lastName;
}

var User = mongoose.model('User', UserSchema);

module.exports = User;