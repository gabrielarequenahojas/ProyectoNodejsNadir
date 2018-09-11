var express = require('express');
var router = express.Router();


// create CRUD 
//https://www.youtube.com/watch?v=WYa47JkZH_U
//https://knexjs.org/
const knex = require('../db/knex');


//routing read database postgrsql
router.get('/', function(req,res){  
  knex('usuario')
    .where({ tipo_usuario_id: 3 })
    .select()
    .then( objCollectUsers => {
       res.render('partials/usuario', {objUsers: objCollectUsers});
     });
    
}); 

//routing new + form+ get
router.get('/new', (req, res) => {
  res.render('user/new', { title: "Form Users" });
});

function seleccionJugador(){
  alert('hola');
}

function respondAndRenderUser(id){  
  if(typeof id != 'undefined'){
    
  }else{
    
    res.status(500);
    alert('hola');
     
  }  
}


module.exports = router;
