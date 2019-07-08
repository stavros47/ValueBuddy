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

module.exports = router;
