var express = require('express');
var Trip = require('../models/trip');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Trip.find(function(err, trips) {
      if(err) return res.status(500).send(err);
      res.send(trips);
    });
  })
  .post(function(req, res) {
    Trip.create(req.body, function(err, trip) {
      if(err) return res.status(500).send(err);
      res.send(trip);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Trip.findById(req.params.id, function(err, trip) {
      if(err) return res.status(500).send(err);
      res.send(trip);
    });
  })
  .put(function(req, res) {
    Trip.findByIdAndUpdate(req.params.id, function(err, trip) {
      if(err) return res.status(500).send(err);
      res.send({message: 'Success!'});
    });
  })
  .delete(function(req, res) {
    Trip.findByIdAndRemove(req.params.id, function(err, trip) {
      if(err) return res.status(500).send(err);
      res.send({message: 'Trip removed.'});
    });
  });

module.exports = router;