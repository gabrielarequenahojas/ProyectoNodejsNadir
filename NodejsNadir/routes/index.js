var express = require('express');
var router = express.Router();

var fortune = require('../lib/fortune.js');
var fs = require('fs');
var https = require('http');
// index home
//router.get('/', (req, res) => res.render('home'));


//login route
router.get('/login', (req, res) => res.render('login', {csrf: 'abc'}));

//usa modulos de la libreria fortune.js
router.get('/about', (req, res) => 
          res.render('about', {fortune: fortune.getFortune() })
       );


//++++++++++++++++++FORMS ++++++++++++++++++++

// route login form
router.get('/login', function(req, res){
  res.render('login', { csrf: 'ABCD token' });
});

// get data from form in order to save on database
router.post('/process', function(req, res){
  console.log('Form (from querystring): ' + req.query.form);
  console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('Name (from visible form field): ' + req.body.name);
  console.log('Email (from visible form field): ' + req.body.email);
  res.redirect(303, '/thank-you');
});



module.exports = router;