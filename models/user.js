var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true}
});

userSchema.methods.sayHello = function() {
  return 'Hi ' + this.lastName;
}

var User = mongoose.model('User', userSchema);

module.exports = User;