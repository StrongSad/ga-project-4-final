var mongoose = require('mongoose');
var bcyrpt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true},
  password: String,
  trips: [{ type:Schema.ObjectId, ref:"trip", childPath:"children" }]
});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      firstName: ret.firstName,
      lastName: ret.lastName,
      email: ret.email,
      username: ret.username
    };
    return returnJson
  }
});

UserSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
    if(err) {
      callback(err)
    } else {
      callback(null, res ? this : false);
    }
  });
}

UserSchema.pre('save', function(next) {
  if(!this.isModified('password')) {
    next();
  } else {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;