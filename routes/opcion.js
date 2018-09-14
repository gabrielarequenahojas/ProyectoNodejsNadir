var express = require('express');
var router = express.Router();


const knex = require('../db/knex');


//routing read database postgrsql
router.get('/', (req, res) => {
  knex('opcion')
    .select()
    .then(opcion =>{
      res.render('opcion/index', { title: "opcion", objOpcion: opcion });
  });  
});

//routing new + form+ get
router.get('/new', (req, res) => {
  res.render('opcion/new', { title: "Form opcion" });
});


router.get('/:id/edit', (req,res) => {
  const id = req.params.id;
  console.log('edit id:'+id);
  respondAndRenderTodo(id,res,'opcion/edit');  
});

//routing new + form + post
router.post('/', (req, res) => {  
 validateTodoRenderError(req, res, (opcion) => {
    knex('opcion')
      .insert(opcion, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/opcion/${id}`);
      });
  });
});

router.put('/:id',(req,res) => {
  console.log('updating...');
  validateTodoRenderError(req,res,(opcions) => {
    knex('opcion')
      .where('id',req.params.id)

      .update({
      pregunta_id: req.body.pregunta_id,
       url_imagen: req.body.url_imagen, 
       valida: req.body.valida
  
    } )

      .then( () =>  {
        res.redirect(`/opcion`);
      });
  });   
});


router.delete('/:id', (req, res) => {
  console.log('deleting...');
  const id = req.params.id;
  if(validId(id)) {
    knex('opcion')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/opcion');
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
    const opcion = {
      pregunta_id: req.body.pregunta_id,
       url_imagen: req.body.url_imagen, 
       valida: req.body.valida
    };
    callback(opcion);
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid todo'
    });
  }
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {
    knex('opcion')
      .select()
      .where('id', id)
      .first()
      .then(opcion=> {
        res.render(viewName, {opcion: opcion});
      });
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id'
    });
  }
}

function validTodo(opcion) {
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
router.get('/rest/opcion/', (req, res) => {
  knex('opcion')
    .select()
    .then(objOpcion => {
      res.json(objOpcion); 
    });
});

router.get('/rest/opcion/:id', (req, res) => {
  let id=req.params.id;
  if(id!= undefined) {
    knex('opcion')
    .select()
    .first()
    .where('id', id)
    .then((opcion)=> {   
      res.json(opcion);
    })
  }
});

router.post('/rest/opcion/agregar/', (req, res) => {

  let opcion = {
    pregunta_id: req.body.pregunta_id,
    url_imagen: req.body.url_imagen,
    valida: req.body.valida
  }

  knex('opcion')
    .insert(opcion)
    .then((opcion)=> {
      res.json(opcion)
  });

});
router.put('/rest/opcion/editar/:id', (req, res) => {
  let id = req.params.id;
  let pregunta = {
    pregunta_id: req.body.pregunta_id,
    url_imagen: req.body.url_imagen,
    valida: req.body.valida
  }

  knex('opcion')
    .where('id', id)
    .update(opcion, 'id')
    .then(()=> {
      res.json(opcion)
  });
});

router.delete('/rest/opcion/eliminar/:id', (req, res) => {
  let id = req.params.id; 
  if(id != undefined) { 
    knex('opcion')
    .del()
    .where('id', id)
    .then(()=> { 
      res.json(id)
    })
  }
});



module.exports = router;

