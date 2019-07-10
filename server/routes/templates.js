const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET all Templates. */
router.get('/', function(req, res, next) { 
  database.raw('SELECT * FROM get_templates()').then(data =>{
    if(data.rows === undefined || data.rows.length == 0){
        res.status(404);
        res.json({message:"No Templates were Found!", templates:[]});        
    }else{
        res.status(200);
        res.json({templates:data.rows});
    }
  });    

});

/* GET a Template */
router.get('/:id', function(req, res, next) { 
    database.raw(`SELECT * FROM get_template(${parseInt(req.params.id)})`).then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.json({message:"Template not Found!", template:{}});        
        }else{
            res.json({template:data.rows});       
        }      
    });    
  
});

/* GET all Batches created from a specific template */
router.get('/:id/Batches', function(req, res, next) { 
    database.raw(`SELECT * FROM get_template_batches(${parseInt(req.params.id)})`).then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.json({message:`Template_id: ${req.params.id} has no batches yet.`, template:{}});        
        }else{
            res.json({template:data.rows});       
        }      
    });    
  
});

/* CREATE(POST) a new coupon Template*/
router.post('/', function(req, res, next) { 
    database.raw(`SELECT * FROM insert_template(${parseInt(req.body.business_id)},
    '${req.body.description}', 
    '${req.body.discount_type}', 
    ${parseInt(req.body.discount)})`) 
     .then(data =>{
       if(data.rows === undefined || data.rows.length == 0){
         res.json({message:"Template not created!", template:{}});        
       }else{
         res.json({template:data.rows});       
       }      
     }).catch(error =>{console.log(error); res.send("ERROR!")});    
   
     
   });


module.exports = router;
