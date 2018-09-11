var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

router.get('/', function(req,res){  
   knex('video')    
    .select()
    .then( objCollectVideos => {
       res.render('partials/bibliotecaVideos', {objVideos: objCollectVideos});
     });    
});

function respondAndRenderVideo(id,res,viewName){  
  alert('aaaaaaaaa');
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


// router read show /user/id 
router.get('aulaVideo/:id', (req, res) => {
  alert('aaaaaaaaa');
   const id = req.params.id;
  respondAndRenderVideo(id,res,'/aulaVideo'); 
});





router.get('/', function (req, res) {
 
  var nombre = req.query.nombre || '';  
  res.send("<div id='video'><iframe src='https://www.youtube.com/watch?v=Q4-jOuHO-z4' frameborder='0' allowfullscreen></iframe></div>");
});


/*
router.get('/aulaVideo', (req, res) => {
  knex('video')
      .select()
      .where('id',id)
      .first()
      .then(videos => {
        res.render('/aulaVideo',{video: videos});
});*/

/*router.get('/', function(req,res){  
   /*knex('video')
    .where({'id': video.id})     
    .select('url_video')
    .then( objCollectVideos => {
       res.render('/aulaVideo', {video: objCollectVideos});
     }); 
     res.send('<html><body>'
          + '<h1>Saludo</h1>'
          + '<form method="get" action="/aulaVideo">'
          + '<label for="nombre">¿Cómo te llamas?</label>'
          + '<input type="text" name="nombre" id="nombre">' 
          + '<input type="submit" value="Enviar"/>'
          + '</form>'
          + '</body></html>');   
}); */

module.exports = router;
