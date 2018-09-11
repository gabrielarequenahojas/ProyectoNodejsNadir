var express = require('express');
var router = express.Router();


// create CRUD 
//https://www.youtube.com/watch?v=WYa47JkZH_U
//https://knexjs.org/
const knex = require('../db/knex');


//routing read database postgrsql
router.get('/', (req, res) => {
  knex('video')
    .select()
    .then(videos =>{
      res.render('video/index', { title: "video", objVideos: videos });
  });  
});

//routing new + form+ get
router.get('/new', (req, res) => {
  res.render('video/new', { title: "Form videos" });
});

// router read show /video/id 
router.get('/:id', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id,res,'video/single');
  
});

router.get('/:id/edit', (req,res) => {
  const id = req.params.id;
  console.log('edit id:'+id);
  respondAndRenderTodo(id,res,'video/edit');  
});

//routing new + form + post
router.post('/', (req, res) => {  
 validateTodoRenderError(req, res, (videos) => {
    knex('video')
      .insert(videos, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/video/${id}`);
      });
  });
});

router.put('/:id',(req,res) => {
  console.log('updating...');
  validateTodoRenderError(req,res,(videos) => {
    knex('video')
      .where('id',req.params.id)
      .update({titulo : req.body.titulo, descripcion: req.body.descripcion, creditos: req.body.creditos, 
      url_video : req.body.url_video, url_portada : req.body.url_portada} )
      .then( () =>  {
        res.redirect(`/video/${req.params.id}`);
      });
  });   
});


router.delete('/:id', (req, res) => {
  console.log('deleting...');
  const id = req.params.id;
  if(validId(id)) {
    knex('video')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/video');
      });
  } else {
    res.status( 500);
   res.render('error', {
      message:  'Invalid id'
    });
  }
});

function validateTodoRenderError(req, res, callback) {  
  console.log(validTodo(req.body));
  if(validTodo(req.body)) {
    //alert(validTodo(req.body));
    const video = {
      titulo : req.body.titulo,
       descripcion: req.body.descripcion,
        creditos: req.body.creditos, 
      url_video : req.body.url_video,
       url_portada : req.body.url_portada
    };
    callback(usuario);
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid todo'
    });
  }
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {
    knex('video')
      .select()
      .where('id', id)
      .first()
      .then(videos=> {
        res.render(viewName, {video: videos});
      });
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id'
    });
  }
}

function validTodo(usuarios) {
  /*return typeof usuarios.nombre == 'string' &&
          usuarios.nombre.trim() != '' &&

          typeof usuarios.tipo_usuario != 'undefined' &&
          !isNaN(usuarios.tipo_usuario);*/
          return true;
}



function validId(id) {
  return !isNaN(id);
}



module.exports = router;

