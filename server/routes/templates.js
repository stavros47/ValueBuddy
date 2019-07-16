const express = require('express');
const router = express.Router();
const database = require('../database');
const  authorize  = require('../helpers/authentication');
const Role = require('../helpers/role');

/* GET all Templates. 
ToDo: Perhaps remove this route all together. Business/:id/Templates/
*/
router.get('/', authorize(Role.Admin), function(req, res, next) { //All authorized admins
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
router.get('/:template_id', authorize(Role.Admin), function(req, res, next) { //All authorized admins
    database.raw(`SELECT * FROM get_template(${parseInt(req.params.template_id)})`).then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.status(404).json({message:"Template not Found!", template:{}});        
        }else{
            res.status(200).json({template:data.rows});       
        }      
    });    
  
});

/* GET all Batches created from a specific template */
router.get('/:template_id/Batches', authorize(Role.Admin), function(req, res, next) { //All authorized admins
    database.raw(`SELECT * FROM get_template_batches(${parseInt(req.params.template_id)})`).then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.json({message:`Template_id: ${req.params.template_id} has no batches yet.`, template:{}});        
        }else{
            res.json({template:data.rows});       
        }      
    });    
  
});

/* CREATE(POST) a new coupon Template*/
router.post('/', authorize(Role.Admin), function(req, res, next) { //All authorized admins
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
