'use strict';
const app = require('express')();
const mongoose = require('mongoose');
const Router = require('./route/routes');
const bodyParser = require('body-parser').json();
const jwt = require('./lib/jwt');

mongoose.connect('mongodb://localhost/dev_db');

app.use('/', Router);

app.get('/test', (req, res) => {
  res.send('no token required');
});

app.post('/test', bodyParser, jwt, (req, res) => {
  res.json({message:'token required', user: req.user});
});

app.use((err, req, res, next) => {
  res.status(500).json({message: err.message});
  next(err);
});

app.listen(3000);
