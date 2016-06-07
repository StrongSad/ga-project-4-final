var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();

var secret = "StrongSad7734377G3tonth3train!"

var User = require('./models/user');
var Trip = require('./models/trip');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ga-project-4-final'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/trips', expressJWT({secret: secret}));
// app.use('/api/users', expressJWT({secret: secret})
// .unless({path: ['/api/users'], method: 'post'}));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
});

app.use('/api/trips', require('./controllers/trips'));
app.use('/api/users', require('./controllers/users'));

app.post('/api/auth', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if(err || !user) return res.status(401).send({message: 'User not found'});
    user.authenticated(req.body.password, function(err, result) {
      if(err || !result) return res.status(401).send({message: 'User not authenticated'});

      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});



/********************************************************** 
  JWT     Don't think I need this anymore
**********************************************************/

  // app.post('/api/auth', function(req, res) {
  //   // some code to check that a user's credentials are right #bcryptmaybe?
  //   // collect any information we want to include in the token, like that user's info

  //   User.findOne({email: req.body.email}, function(err, user) {
  //     if (err || !user) return res.send({message: "User not found"});
  //     user.authenticated(req.body.password, function(err, result) {
  //       if (err || !result) return res.send({message: "User not authenticated"});

  //       //make token and send as json
  //       var token = jwt.sign(user, secret);
  //       res.send({user: user, token: token});
  //     });
  //   });
  // });

  // app.use('/api/users', expressJWT({secret: secret}).unless({method: 'POST'}));
  // app.use(function(err, req, res, next) {
  //   // send an appropriate status code & JSON object saying there was an error, if there was one.
  //   if (err.name === 'UnauthorizedError') {
  //     res.status(401).send({message: 'You need an authorization token to view this information.'})
  //   }
  // });

/********************************************************** 
  /JWT
**********************************************************/

app.listen(3000);