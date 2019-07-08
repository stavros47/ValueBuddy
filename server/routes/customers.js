const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) { 
  database.raw('SELECT * FROM get_customers()').then(data =>{
    if(data.rows === undefined || data.rows.length == 0){
      res.json({message:"Customers not Found!", customers:[]});        
    }else{
      res.json({customers:data.rows});
    }
  });    

});

/* GET a Customer */
router.get('/:id', function(req, res, next) { 
    // database.raw(`SELECT * FROM get_customer($1)`,req.body.id).then(data =>{
    database.raw(`SELECT * FROM get_customer(${parseInt(req.params.id)})`).then(data =>{
      if(data.rows === undefined || data.rows.length == 0){
        res.json({message:"Customer not Found!", customer:{}});        
      }else{
        res.json({customer:data.rows});       
      }      
    });    
  
});

/* GET a Customer's Coupons. */
router.get('/:id/Coupons', function(req, res, next) { 
  // database.raw(`SELECT * FROM get_customer($1)`,req.body.id).then(data =>{
  database.raw(`SELECT * FROM get_customers_coupons(${parseInt(req.params.id)})`).then(data =>{
    if(data.rows === undefined || data.rows.length == 0){
      res.json({message:"Customer did not have any coupons claimed!", coupons:[]});        
    }else{
      res.json({coupons:data.rows});       
    }      
  });    

});



module.exports = router;
