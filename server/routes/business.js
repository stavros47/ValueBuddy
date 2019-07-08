const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET all Businesses. */
router.get('/', function(req, res, next) { 
  database.raw('SELECT * FROM get_businesses()').then(data =>{
    if(data.rows === undefined || data.rows.length == 0){
        res.status(404);
        res.json({message:"No businesses were Found!", businesses:[]});        
    }else{
        res.status(200);
        res.json({businesses:data.rows});
    }
  });    

});

/* GET a Business */
router.get('/:id', function(req, res, next) { 
    database.raw(`SELECT * FROM get_business(${parseInt(req.params.id)})`).then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.json({message:"Business not Found!", business:{}});        
        }else{
            res.json({business:data.rows});       
        }      
    });    
  
});

/* GET all Batches of a specific business. */
router.get('/:id/Batches', function(req, res, next) { 
    database.raw(`SELECT * FROM get_business_batches(${parseInt(req.params.id)})`).then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.json({message:"Business does not have any Coupon batches!", batches:[]});        
        }else{
            res.json({batches:data.rows});       
        }      
    });    

});

/* GET all Templates of a specific business. */
router.get('/:id/Templates', function(req, res, next) { 
    database.raw(`SELECT * FROM get_business_templates(${parseInt(req.params.id)})`).then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.json({message:"Business does not have any Coupon templates!", templates:[]});        
        }else{
            res.json({templates:data.rows});       
        }      
    });    

});

module.exports = router;
