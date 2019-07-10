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

/*GET All coupons that are instances of a specific batch */
router.get('/:id/Coupons', function(req, res, next) { 
    database.raw(`SELECT * FROM get_batch_coupons(${parseInt(req.params.id)})`).then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.json({message:`No coupons were claimed from batch_id:${req.params.id}`, coupons:{}});        
        }else{
            res.json({coupons:data.rows});       
        }      
    });    
  
});

/* CREATE(POST) a new coupon Template*/
router.post('/', function(req, res, next) { 
database.raw(`SELECT * FROM insert_batch(${parseInt(req.body.template_id)},
    ${parseInt(req.body.created_count)}, 
    '${req.body.start_date}', 
    '${req.body.expiry_date}', 
    ${parseInt(req.body.status_id)})`) 
        .then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.json({message:"Batch was not created", batch:{}});        
        }else{
            res.json({batch:data.rows});       
        }      
        }).catch(error =>{console.log(error); res.send("ERROR!")});    

});

module.exports = router;
