var express = require('express');
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var User = require('./models/user');
var Trip = require('./models/trip');

var secret = "StrongSad7734377G3tonth3train!"

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ga-project-4-final'); 

/********************************************************** 
  JWT
**********************************************************/

  app.post('/api/auth', function(req, res) {
    // some code to check that a user's credentials are right #bcryptmaybe?
    // collect any information we want to include in the token, like that user's info

    User.findOne({email: req.body.email}, function(err, user) {
      if (err || !user) return res.send({message: "User not found"});
      user.authenticated(req.body.password, function(err, result) {
        if (err || !result) return res.send({message: "User not authenticated"});

        //make token and send as json
        var token = jwt.sign(user, secret);
        res.send({user: user, token: token});
      });
    });
  });

  app.use('/api/users', expressJWT({secret: secret}).unless({method: 'POST'}));
  app.use(function(err, req, res, next) {
    // send an appropriate status code & JSON object saying there was an error, if there was one.
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({message: 'You need an authorization token to view this information.'})
    }
  });

/********************************************************** 
  /JWT
**********************************************************/


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
app.get('/users/:uname', function(req, res) {
  User.find({ username: req.params.uname }, function(err, user) {
    if (err) return res.send(err);
    res.send(user);
  });
});

// updating
// on click get first name/get user and update information
app.post('/users/:uname', function(req, res) {
  User.findOneAndUpdate({ username: 'briBri'}, { username: 'biranna'}, function(err, user) {
    if (err) console.log(err);
    console.log(user);
  });
})


//deleting
app.delete('/users/:uname', function(req, res) {
  User.findOneAndRemove({ username: req.params.uname }, function(err, user) {
    if(err) console.log(err);
    res.redirect('/users')
  });
});







app.listen(3000);