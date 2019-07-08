const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) { 
  database.raw('SELECT * FROM get_customers()').then(data =>{
    res.json(data.rows);
  });    

});

/* GET home page. */
router.get('/:id', function(req, res, next) { 
    // database.raw(`SELECT * FROM get_customer($1)`,req.body.id).then(data =>{
    database.raw(`SELECT * FROM get_customer(${parseInt(req.params.id)})`).then(data =>{
      if(data.rows === undefined || data.rows.length == 0){
        res.send({message:"User not Found!"});        
      }else{
        res.send(data.rows);
        console.log(data.rows);
      }
      
    });    
  
  });


module.exports = router;
