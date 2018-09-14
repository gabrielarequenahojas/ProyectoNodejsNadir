var express = require('express');
var router = express.Router();


// create CRUD 
//https://www.youtube.com/watch?v=WYa47JkZH_U
//https://knexjs.org/
const knex = require('../db/knex');


//routing read database postgrsql
router.get('/', (req, res) => {
  knex('puntaje')
    .select()
    .then(puntaje =>{
      res.render('puntaje/index', { title: "puntaje", objPuntajes: puntaje });
  });  
});

//routing new + form+ get
router.get('/new', (req, res) => {
  res.render('puntaje/new', { title: "Form puntaje" });
});


router.get('/:id/edit', (req,res) => {
  const id = req.params.id;
  console.log('edit id:'+id);
  respondAndRenderTodo(id,res,'puntaje/edit');  
});

//routing new + form + post
router.post('/', (req, res) => {  
 validateTodoRenderError(req, res, (puntaje) => {
    knex('puntaje')
      .insert(puntaje, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/puntaje/${id}`);
      });
  });
});

router.put('/:id',(req,res) => {
  console.log('updating...');
  validateTodoRenderError(req,res,(puntaje) => {
    knex('puntaje')
      .where('id',req.params.id)

      .update({
      video_id: req.body.video_id,
      usuario_id: req.body.usuario_id, 
      valor: req.body.valor
  
    } )

      .then( () =>  {
        res.redirect(`/puntaje`);
      });
  });   
});


router.delete('/:id', (req, res) => {
  console.log('deleting...');
  const id = req.params.id;
  if(validId(id)) {
    knex('puntaje')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/puntaje');
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
    const puntaje = {
       video_id: req.body.video_id,
      usuario_id: req.body.usuario_id, 
      valor: req.body.valor
    };
    callback(puntaje);
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid todo'
    });
  }
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {
    knex('puntaje')
      .select()
      .where('id', id)
      .first()
      .then(puntaje=> {
        res.render(viewName, {puntaje: puntaje});
      });
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id'
    });
  }
}

function validTodo(puntaje) {
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

