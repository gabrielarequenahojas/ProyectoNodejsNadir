var express = require('express');
var router = express.Router();
var fortune = require('../lib/fortune.js');

// index home
router.get('/', (req, res) => res.render('home'));

//login route
router.get('/login', (req, res) => res.render('login', {csrf: 'abc'}));

//usa modulos de la libreria fortune.js
router.get('/about', (req, res) => 
          res.render('about', {fortune: fortune.getFortune() })
       );

module.exports = router;