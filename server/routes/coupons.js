const express = require('express');
const router = express.Router();
const database = require('../database');
const  authorize  = require('../helpers/authentication');
const Role = require('../helpers/role');

/* GET all Coupons. */
router.get('/', authorize(Role.Admin), function(req, res, next) { //Only admins
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
router.get('/:coupon_id', authorize(Role.Admin), function(req, res, next) { //Only admins
    database.raw(`SELECT * FROM get_coupon(${parseInt(req.params.coupon_id)})`).then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.status(404).json({message:"Coupon not Found!", coupon:{}});        
        }else{
            res.status(200).json({coupon:data.rows});       
        }      
    });    
  
});

module.exports = router;
