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

/* GET all claimed coupons that belong to a specific business. */
router.get('/:id/Coupons', function(req, res, next) { 
    database.raw(`SELECT * FROM get_business_coupons(${parseInt(req.params.id)})`).then(data =>{
        if(data.rows === undefined || data.rows.length == 0){
            res.json({message:`No coupons from business_id:${req.params.id} were claimed.`, coupons:[]});        
        }else{
            res.json({coupons:data.rows});       
        }      
    });    

});

/* CREATE(POST) a new Business*/
router.post('/', function(req, res, next) { 
    database.raw(`SELECT * FROM insert_business( 
       '${req.body.password}',
       '${req.body.business_name}',
       '${req.body.business_type}',
       '${req.body.websiteURL}',
       '${req.body.email}',
       '${req.body.phone}',
       '${req.body.address1}',
       '${req.body.address2}',
       '${req.body.city}',
       '${req.body.country}',
       '${req.body.about}'
       )`) 
     .then(data =>{
       if(data.rows === undefined || data.rows.length == 0){
         res.json({message:"Business not found", business:{}});        
       }else{
         res.json({business:data.rows});       
       }      
     }).catch(error =>{console.log(error); res.send("ERROR!")});    
     
});

/* update a business */
/*cannot change email for now   ${req.body.email ? `'${req.body.email}'` : `NULL`}, */
// ToDo: Validations and test unique email constraints
router.put('/:id', function(req, res, next) { 
    database.raw(`SELECT * FROM update_business(
      ${parseInt(req.params.id)},
      ${req.body.business_name ? `'${req.body.business_name}'` : `NULL`},
      ${req.body.business_type ? `'${req.body.business_type}'` : `NULL`},
      ${req.body.websiteURL ? `'${req.body.websiteURL}'` : `NULL`},      
      ${req.body.phone ? `'${req.body.phone}'` : `NULL`},
      ${req.body.about ? `'${req.body.about}'` : `NULL`}  
    )`).then(data =>{
      if(data.rows === undefined || data.rows.length == 0 || data.rows.update_business === false){       
        res.json({message:"Could not update Business"});        
      }else{       
        res.json({result:data.rows});       
      }      
    }).catch(error =>{console.log(error); res.send("ERROR!")});  
  
  });


module.exports = router;
