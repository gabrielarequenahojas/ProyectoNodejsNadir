var express = require('express');
var router = express.Router();


// create CRUD 
//https://www.youtube.com/watch?v=WYa47JkZH_U
//https://knexjs.org/
const knex = require('../db/knex');


router.use(express.static(__dirname + '/public'));
//routing read database postgrsql
/*router.get('/', (req, res) => {
  knex('video')
    .select()
    .then(videos =>{
      res.render('video/index', { title: "VIDEOS", objVideos: videos });
  });  
});*/

//routing new + form+ get
router.get('/new', (req, res) => {
  res.render('user/new', { title: "Form Users" });
});

function respondAndRenderUser(id,res,viewName){  
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
      message: 'Invalid ID videos' 
    });    
  }  
}


// router read show /user/id 
router.get('/:id', (req, res) => {
  const id = req.params.id;
  respondAndRenderUser(id,res,'partials/video/single');  
});

router.get('/:id/show', (req,res) => {
  const id = req.params.id;
  console.log('show id:'+id);
  respondAndRenderUser(id,res,'partials/video/show');  
});


function validUser(user){
  return typeof user.nombre == 'string';
}

function validateUserInsertUpdateRedirect(req,res,callback){
  if(validUser(req.body)){
     //inser into db
    const usuarios = {
      nombre : req.body.nombre
    };    
    callback(usuarios);
    console.log("created");
  }else{
    //responde with an error    
    console.log('error on created');   
    res.status(500);
    res.render('error', {
      message: 'Invalid user at created' 
    });
  }
}

//routing new + form + post
router.post('/', (req, res) => {  
  validateUserInsertUpdateRedirect(req,res,(user) => { 
    knex('usuarios')
      .returning('id')
      .insert({nombre: req.body.nombre})
      .then(ids =>  {
        const id = ids[0];
        res.redirect(`/user/${id}`);
      });
  });
});

router.put('/:id',(req,res) => {
  console.log('updating...');
  validateUserInsertUpdateRedirect(req,res,(user) => {
    knex('usuarios')
      .where('id',req.params.id)
      .update({nombre: req.body.nombre})
      .then( () =>  {
        res.redirect(`/user/${req.params.id}`);
      });
  });   
});

router.delete('/:id',(req,res)=>{
  const id=req.params.id;
  console.log('deleting...');
             
 if(typeof id != 'undefined'){
    knex('usuarios')      
      .where('id',id)
      .del()
      .then(usuarios => {
        console.log('delete id: '+id); 
        res.redirect('/user');      
    });
    
  }else{
    
    console.log('error invalid delete ');   
    res.status(500);
    res.render('error', {
      message: 'Invalid ID delete ' 
    });    
  }      
});


module.exports = router;