const express = require('express');
var exphbs  = require('express-handlebars');
var fs = require('fs');
var https = require('http');

const path = require('path');
const PORT = process.env.PORT || 5000 ;

var fortune = require('./lib/fortune.js');

const knex = require('./db/knex');


var app = express();

app.engine('handlebars', 
           exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

//add modules routers
var routes = require('./routes/index.js');
//var users = require('./routes/users.js');

//body.parse
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

app.post('/process', function(req,res){
  console.log('formulario:'+ req.query.form);
  console.log('nombre'+ req.body.name);
  console.log('nombre'+ req.body.email);
});


//archivos estáticos
app.use(express.static(path.join(__dirname,'/public')));

// call routers
app.use('/',routes);
//app.use('/users',users);

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

app.get('/', function(req, res){
    res.redirect(303, '/index.html');
});
app.get('/index', function(req, res){
    res.redirect(303, '/index.html');
});
app.get('/index.html', function(req, res){
    serveStaticFile(res, '/views/index.html', 'text/html');
});


app.get('/user', function(req,res){
  knex('usuarios')
    .select()
    .then( objCollectUsers => {
       res.render('user/index', {objUsers: objCollectUsers});
     });
});



app.listen(PORT, () => console.log(`Listening on ${ PORT }`));



















