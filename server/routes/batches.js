const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET all Batches. */
router.get('/', function(req, res, next) { 
  database.raw('SELECT * FROM get_batches()').then(data =>{
    if(data.rows === undefined || data.rows.length == 0){
        res.status(404);
        res.json({message:"No Batches were Found!", batches:[]});        
    }else{
        res.status(200);
        res.json({batches:data.rows});
    }
  });    

});

/* GET a Batch */
router.get('/:id', function(req, res, next) { 
    database.raw(`SELECT * FROM get_batch(${parseInt(req.params.id)})`).then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.json({message:"Batch not Found!", batch:{}});        
        }else{
            res.json({batch:data.rows});       
        }      
    });    
  
});

module.exports = router;
