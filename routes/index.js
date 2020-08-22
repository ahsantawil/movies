var express = require('express');
var router = express.Router();

/* Halaman Welcome */
router.get('/', function(req, res, next) {
  res.render('welcome', { title: 'Halaman Welcome' });
});

// Halaman Dashboard
router.get('/dashboard', function(req, res, next){
  res.render('dashboard', {title:'Halaman Dashboard'})
});

module.exports = router;
