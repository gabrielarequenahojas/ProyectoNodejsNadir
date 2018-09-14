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
router.get('/aulaVideo/:id', (req, res) => {
  //console.log("aquiiii");
  const id = req.params.id;
  respondAndRenderVideo(id,res,'/aulaVideo'); 
});





router.get('/', function (req, res) {
 
  var nombre = req.query.nombre || '';  
  res.send("<div id='video'><iframe src='https://www.youtube.com/watch?v=Q4-jOuHO-z4' frameborder='0' allowfullscreen></iframe></div>");
});



module.exports = router;
