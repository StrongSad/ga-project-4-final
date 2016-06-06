var express = require('express');
var bodyParser = require('body-parser');
var User = require('./models/user');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ga-project-4-final'); 


var newUser3 = User({
  firstName: 'Chris',
  lastName: 'Foul',
  email: 'chrisfoul@gmail.com',
  username: 'chrisfoul'
});

newUser3.save(function(err) {
  if (err) console.log(err);
  console.log('User3 created!');
});

var newUser = User({
  firstName: 'Bob',
  email: 'bob@gmail.com',
  username: 'bob'
})

//save user bob
newUser.save(function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log('User Created!')
  }
});


var newUser2 = User({
  firstName: 'Brian',
  email: 'brian@gmail.com',
  username: 'bribri'
});

newUser2.save(function(err) {
  if(err) console.log(err);
  console.log('User 2 created!');
});


app.get('/', function(req, res) {
  res.send(newUser3.sayHello());
});

//find all users
app.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    if(err) return res.send(err);
    res.send(users);
  });
});

//find one by first name
app.get('/users/:fname', function(req, res) {
  User.find({ firstName: req.params.fname }, function(err, user) {
    if (err) return res.send(err);
    res.send(user);
  });
});

// updating
// on click get first name/get user and update information
User.findOneAndUpdate({ firstName: 'brian'}, { username: 'biranna'}, function(err, user) {
  if (err) console.log(err);
  console.log(user);
});

//deleting
app.delete('/users/:fname', function(req, res) {
  User.findOneAndRemove({ firstName: req.params.fname }, function(err, user) {
    if(err) console.log(err);
    console.log(user + ' deleted');
  });
});







app.listen(3000);