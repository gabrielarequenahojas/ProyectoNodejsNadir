const express = require('express');
const PORT = process.env.PORT || 5000 ;
const knex = require('./db/knex');
const path = require('path');

var exphbs  = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var fs = require('fs');
var https = require('http');
//body.parse
var bodyParser = require('body-parser');
var fortune = require('./lib/fortune.js');
//add modules routers
var routes = require('./routes/index.js');
//var users = require('./routes/users.js');
var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.disable('x-powered-by');
//archivos estáticos
app.use(express.static(__dirname + '/public'));

// call routers
app.use('/',routes);
//app.use('/users',users);

var handlebars = exphbs.create({
    defaultLayout:'main.handlebars'
});

express_handlebars_sections(handlebars);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.post('/process', function(req,res){
  console.log('formulario:'+ req.query.form);
  console.log('nombre'+ req.body.name);
  console.log('nombre'+ req.body.email);
});


function serveStaticFile(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err,data) {
        if(err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode,
                          { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

/*INDEX HTML*/
app.get('/', function(req, res){
    res.redirect(303, '/index.html');
});
app.get('/index', function(req, res){
    res.redirect(303, '/index.html');
});
app.get('/index.html', function(req, res){
    serveStaticFile(res, '/views/index.html', 'text/html');
});


/*BIBLIOTECA VIDEOS*/

app.get('/bibliotecaVideos', function(req, res){
    res.render('bibliotecaVideos');

});


/*CONOCENOS*/

app.get('/conocenos', function(req, res){
    res.render('conocenos');

});

/*CREA CUENTA*/

app.get('/creaCuenta', function(req, res){
    res.render('creaCuenta');

});

/*terminos y Condiciones*/

app.get('/terminosCondiciones', function(req, res){
    res.render('terminosCondiciones');

});


app.get('/user', function(req,res){
  knex('usuarios')
    .select()
    .then( objCollectUsers => {
       res.render('user/index', {objUsers: objCollectUsers});
     });
});



app.listen(PORT, () => console.log(`Listening on ${ PORT }`));



















