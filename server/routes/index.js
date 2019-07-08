const express = require('express');
const router = express.Router();
const database = require('../database');
const customersRoutes = require('./customers');



/* GET home page. */
router.get('/', (req,res,next)=>{
  res.json({message:'Welcome to ValueBuddy API'});
});

router.use('/Customers', customersRoutes);

module.exports = router;
