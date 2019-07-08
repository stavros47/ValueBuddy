const express = require('express');
const router = express.Router();
const database = require('../database');
const customersRoutes = require('./customers');
const businessRoutes = require('./business');
const batchRoutes = require('./batches');


/* GET home page. */
router.get('/', (req,res,next)=>{
  res.json({message:'Welcome to ValueBuddy API'});
});

router.use('/Customers', customersRoutes);
router.use('/Business', businessRoutes);
router.use('/Batches', batchRoutes);

module.exports = router;
