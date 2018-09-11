var express = require('express');
var router = express.Router();

const knex = require('../db/knex');


router.get('/', function(req,res){  
  knex('usuario')
    .where({ tipo_usuario_id: 3 })
    .select()
    .then( objCollectUsers => {
       res.render('partials/usuarios', {objUsers: objCollectUsers});
     });    
}); 

module.exports = router;