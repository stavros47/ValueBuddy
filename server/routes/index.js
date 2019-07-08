const express = require('express');
const router = express.Router();
const database = require('../database');

/*Import Routes*/
const customersRoutes = require('./customers');
const businessRoutes = require('./business');
const batchRoutes = require('./batches');
const templateRoutes = require('./templates');
const couponRoutes = require('./coupons');

/* GET home page. */
router.get('/', (req,res,next)=>{
  res.json({message:'Welcome to ValueBuddy API'});
});

router.use('/Customers', customersRoutes);
router.use('/Business', businessRoutes);
router.use('/Batches', batchRoutes);
router.use('/Templates', templateRoutes);
router.use('/Coupons', couponRoutes);

module.exports = router;
