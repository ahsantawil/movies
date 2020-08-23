var express = require('express');
var router = express.Router();

const {cekAuth, forwardAuth} = require('../config/auth');

/* Halaman Welcome */
router.get('/', forwardAuth, function(req, res, next) {
  res.render('welcome', { title: 'Welcome to Apps' });
});

// Halaman Dashboard
router.get('/dashboard', cekAuth, function(req, res, next){
  res.render('dashboard', {title:'Halaman Dashboard'})
});

module.exports = router;
