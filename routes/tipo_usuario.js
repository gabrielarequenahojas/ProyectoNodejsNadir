var express = require('express');
var router = express.Router();


// create CRUD 
//https://www.youtube.com/watch?v=WYa47JkZH_U
//https://knexjs.org/
const knex = require('../db/knex');


//routing read database postgrsql
router.get('/', (req, res) => {
  knex('tipo_usuario')
    .select()
    .then(tipo_usuarios =>{
      res.render('tipo_usuario/index', { title: "tipo_usuario", objTipo_usuarios: tipo_usuarios });
  });  
});

//routing new + form+ get
router.get('/new', (req, res) => {
  res.render('tipo_usuario/new', { title: "Form tipo_usuarios" });
});


router.get('/:id/edit', (req,res) => {
  const id = req.params.id;
  console.log('edit id:'+id);
  respondAndRenderTodo(id,res,'tipo_usuario/edit');  
});

//routing new + form + post
router.post('/', (req, res) => {  
 validateTodoRenderError(req, res, (tipo_usuarios) => {
    knex('tipo_usuario')
      .insert(tipo_usuarios, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/tipo_usuario/${id}`);
      });
  });
});

router.put('/:id',(req,res) => {
  console.log('updating...');
  validateTodoRenderError(req,res,(tipo_usuarios) => {
    knex('tipo_usuario')
      .where('id',req.params.id)
      .update({id: req.body.id, descripcion: req.body.descripcion})
      .then( () =>  {
        res.redirect(`/tipo_usuario`);
      });
  });   
});


router.delete('/:id', (req, res) => {
  console.log('deleting...');
  const id = req.params.id;
  if(validId(id)) {
    knex('tipo_usuario')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/tipo_usuario');
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
    const tipo_usuario = {
      id: req.body.id,
       descripcion: req.body.descripcion
    };
    callback(tipo_usuario);
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid todo'
    });
  }
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {
    knex('tipo_usuario')
      .select()
      .where('id', id)
      .first()
      .then(tipo_usuarios=> {
        res.render(viewName, {tipo_usuario: tipo_usuarios});
      });
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id'
    });
  }
}

function validTodo(tipo_usuarios) {
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

