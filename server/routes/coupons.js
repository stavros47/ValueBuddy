const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET all Coupons. */
router.get('/', function(req, res, next) { 
  database.raw('SELECT * FROM get_coupons()').then(data =>{
    if(data.rows === undefined || data.rows.length == 0){
        res.status(404);
        res.json({message:"No Coupons were Found!", coupons:[]});        
    }else{
        res.status(200);
        res.json({coupons:data.rows});
    }
  });    

});

/* GET a Coupon */
router.get('/:id', function(req, res, next) { 
    database.raw(`SELECT * FROM get_coupon(${parseInt(req.params.id)})`).then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.json({message:"Coupon not Found!", coupon:{}});        
        }else{
            res.json({coupon:data.rows});       
        }      
    });    
  
});

module.exports = router;
