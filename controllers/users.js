var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    User.find(function(err, users) {
      if(err) return res.status(500).send(err);
      res.send(users);
    });
  })
  .post(function(req, res) {
    User.create(function(err, user) {
      if(err) return res.status(500).send(err);
      res.send(user);
    });
  });

  router.route('/:id')
    .get(function(req, res) {
      User.findById(req.params.id, function(err, user) {
        if(err) return res.status(500).send(err);
        res.send(user);
      });
    })
    .put(function(req, res) {
      User.findByIdAndUpdate(req.params.id, function(err, user) {
        if(err) return res.status(500).send(err);
        res.send({message: "User Updated!"});
      })
    })
    .delete(function(req, res) {
      User.findByIdAndRemove(req.params.id, function(err, user) {
        if(err) return res.status(500).send(err);
        res.send({message: "User Deleted"});
      });
    });


module.exports = router;