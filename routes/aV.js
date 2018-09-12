var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

/*router.get('/', function (req, res) {
 
	var nombre = req.query.nombre || '';	
 	res.send("<div id='video'><iframe src='https://www.youtube.com/watch?v=Q4-jOuHO-z4' frameborder='0' allowfullscreen></iframe></div>");
});

/*router.get('aulaVideo/:id', function (req, res) {
 	alert("hola");
	var id = req.query.id || '';	
 	res.send("<div id='video'><iframe src='https://www.youtube.com/watch?v=Q4-jOuHO-z4' frameborder='0' allowfullscreen></iframe></div>");
});*/


module.exports = router;
