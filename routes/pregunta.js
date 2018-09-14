var express = require('express');
var router = express.Router();

const knex = require('../db/knex');


//routing read database postgrsql
router.get('/', (req, res) => {
  knex('pregunta')
    .select()
    .then(pregunta =>{
      res.render('pregunta/index', { title: "pregunta", objPreguntas: pregunta });
  });  
});

//routing new + form+ get
router.get('/new', (req, res) => {
  res.render('pregunta/new', { title: "Form pregunta" });
});


router.get('/:id/edit', (req,res) => {
  const id = req.params.id;
  console.log('edit id:'+id);
  respondAndRenderTodo(id,res,'pregunta/edit');  
});

//routing new + form + post
router.post('/', (req, res) => {  
 validateTodoRenderError(req, res, (pregunta) => {
    knex('pregunta')
      .insert(pregunta, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/pregunta/${id}`);
      });
  });
});

router.put('/:id',(req,res) => {
  console.log('updating...');
  validateTodoRenderError(req,res,(pregunta) => {
    knex('pregunta')
      .where('id',req.params.id)

      .update({
      video_id: req.body.video_id,
       contenido: req.body.contenido, 
       url_audio: req.body.url_audio
  
    } )

      .then( () =>  {
        res.redirect(`/pregunta`);
      });
  });   
});


router.delete('/:id', (req, res) => {
  console.log('deleting...');
  const id = req.params.id;
  if(validId(id)) {
    knex('pregunta')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/pregunta');
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
    const pregunta = {
      video_id: req.body.video_id,
       contenido: req.body.contenido, 
       url_audio: req.body.url_audio
    };
    callback(pregunta);
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid todo'
    });
  }
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {
    knex('pregunta')
      .select()
      .where('id', id)
      .first()
      .then(pregunta=> {
        res.render(viewName, {pregunta: pregunta});
      });
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id'
    });
  }
}

function validTodo(pregunta) {
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

router.get('/rest/pregunta/', (req, res) => {
  knex('pregunta')
    .select()
    .then(objPreguntas => {
      res.json(objPreguntas); 
    });
});

router.get('/rest/pregunta/:id', (req, res) => {
  let id=req.params.id;
  if(id!= undefined) {
    knex('pregunta')
    .select()
    .first()
    .where('id', id)
    .then((pregunta)=> {   
      res.json(pregunta);
    })
  }
});

router.post('/rest/pregunta/agregar/', (req, res) => {

  let pregunta = {
    video_id: req.body.video_id,
    contenido: req.body.contenido,
    url_audio: req.body.url_audio
  }

  knex('pregunta')
    .insert(pregunta)
    .then((pregunta)=> {
      res.json(pregunta)
  });

});
router.put('/rest/pregunta/editar/:id', (req, res) => {
  let id = req.params.id;
  let pregunta = {
    video_id: req.body.video_id,
    contenido: req.body.contenido,
    url_audio: req.body.url_audio
  }

  knex('video')
    .where('id', id)
    .update(pregunta, 'id')
    .then(()=> {
      res.json(pregunta)
  });
});

router.delete('/rest/pregunta/eliminar/:id', (req, res) => {
  let id = req.params.id; 
  if(id != undefined) { 
    knex('pregunta')
    .del()
    .where('id', id)
    .then(()=> { 
      res.json(id)
    })
  }
});




module.exports = router;

