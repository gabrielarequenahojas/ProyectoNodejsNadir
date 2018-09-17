var express = require('express');
var router = express.Router();

var fortune = require('../lib/fortune.js');
var fs = require('fs');
var https = require('http');
// index home
//router.get('/', (req, res) => res.render('home'));
const knex = require('../db/knex');


var sess;

// route login form
router.get('/login', function(req, res){
  res.render('login', { csrf: 'ABCD token' });
});

router.post('/login', function(req, res){
    //sess = req.session;
    var user = req.body.username;
    var pass = req.body.password;
    console.log(pass);
    knex('usuario')
    .where({ tipo_usuario_id: 1 })
    .select()
    .first()
    .then( usuario => {
        console.log(usuario.username);
        if (usuario.username == user && usuario.password == pass){
          res.render('/administradorVideos', {usuario: usuario});
        }else{
          console.log("clave invalida " + pass)
          //res.render('/login', {csrf: 'ABCD token'});
        }
       
     }); 
       
});

router.get('/logout',function(req,res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

//usa modulos de la libreria fortune.js
router.get('/about', (req, res) => 
          res.render('about', {fortune: fortune.getFortune() })
       );













router.get('/usuarios', function(req,res){  
  knex('usuario')
    .where({ tipo_usuario_id: 3 })
    .select()
    .then( objCollectUsers => {
       res.render('partials/usuarios', {objUsers: objCollectUsers});
     });    
}); 

function respondAndRenderVideo(id,res,viewName){  
  
  if(typeof id != 'undefined'){
    knex('video')
      .select()
      .where('id',id)
      .first()
      .then(videos => {
        res.render(viewName,{video: videos});
    });
  }else{
    
    console.log('error invalid id ');   
    res.status(500);
    res.render('error', {
      message: 'Invalid ID video' 
    });    
  }  
}

router.get('/aulaVideo/:id', (req, res) => {
  //console.log("aquiiii");
  const id = req.params.id;
  respondAndRenderVideo(id,res,'partials/aulaVideo'); 
});

/*router.get('/preguntas', function(req,res){  
  knex('pregunta')
    .where({ video_id: 1 })
    .select()
    .then( objCollectPreguntas => {
       res.render('partials/preguntas', {preguntas: objCollectPreguntas});
     });
    
}); */

function respondAndRenderPregunta(id,res,viewName){  
  
  if(typeof id != 'undefined'){

    knex('pregunta')
      .select()
      .where('video_id',id)
      .first()
      .then(preguntas => {
        res.render(viewName,{pregunta: preguntas});
    });
  }else{
    
    console.log('error invalid id ');   
    res.status(500);
    res.render('error', {
      message: 'Invalid ID video' 
    });    
  }  
}

function obtenerPregunta(id_video){
	knex('pregunta')
      .select('id')
      .where('video_id',id_video)
      .first()
      .then(preguntas => {const id_p = preguntas.id; console.log("parte 1 :" + id_p);return id_p;});

}

router.get('/preguntas/:id', (req, res) => {
  //console.log("aquiiii");
  var id_p = 0;
  const id = req.params.id;
  //id_pg = obtenerPregunta(id);
  knex('pregunta')
      .select()
      .where('video_id',id)
      .first()
      .then(preguntas => {id_p = preguntas.id; console.log("parte 1 :" + id_p);
      console.log("salto");
  knex('opcion')
      .select()
      .where({pregunta_id: id_p})        
      .then(objCollectOpciones => {
      console.log("parte 2 :" + id_p);
        res.render('partials/preguntas', {objOpciones: objCollectOpciones, pregunta: preguntas});
      });  }); 
});



// get data from form in order to save on database
/*router.post('/process', function(req, res){
  console.log('Form (from querystring): ' + req.query.form);
  console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('Name (from visible form field): ' + req.body.name);
  console.log('Email (from visible form field): ' + req.body.email);
  res.redirect(303, '/thank-you');
});*/



module.exports = router;