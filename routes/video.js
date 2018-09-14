var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
// create CRUD 
//https://www.youtube.com/watch?v=WYa47JkZH_U
//https://knexjs.org/
const knex = require('../db/knex');

router.use(bodyParser.json());
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
        res.redirect(`/video`);
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
    callback(video);
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

function validTodo(videos) {
  /*return typeof usuarios.nombre == 'string' &&
          usuarios.nombre.trim() != '' &&

          typeof usuarios.tipo_usuario != 'undefined' &&
          !isNaN(usuarios.tipo_usuario);*/
          return true;
}



function validId(id) {
  return !isNaN(id);
}


//REST
router.get('/rest/videos/', (req, res) => {
  knex('video')
    .select()
    .then(videos => {
      res.json(videos); 
    });
});

router.get('/rest/videos/:id', (req, res) => {
  let id=req.params.id;
  if(id!= undefined) {
    knex('video')
    .select()
    .first()
    .where('id', id)
    .then((video)=> {   
      res.json(video);
    })
  }
});
router.post('/rest/videos/agregar/', (req, res) => {

  let video = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    creditos: req.body.creditos,
    url_video: req.body.url_video,
    url_portada: req.body.url_portada
  }
  console.log(video);

  knex('video')
    .insert(video)
    .then((video)=> {
      res.json(video)
  });

});
router.put('/rest/videos/editar/:id', (req, res) => {
  let id = req.params.id;
  let video = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    creditos: req.body.creditos,
    url_video: req.body.url_video,
    url_portada: req.body.url_portada
  }

  knex('video')
    .where('id', id)
    .update(video, 'id')
    .then(()=> {
      res.json(video)
  });
});

router.delete('/rest/videos/eliminar/:id', (req, res) => {
  let id = req.params.id; 
  if(id != undefined) { 
    knex('video')
    .del()
    .where('id', id)
    .then(()=> { 
      res.json(id)
    })
  }
});



module.exports = router;

