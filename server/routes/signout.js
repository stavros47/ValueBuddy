const express = require('express');
const router = express.Router();
const database = require('../database');
const {validUser, getByEmail} = require('../helpers/validation');
const bcrypt = require('bcrypt');

/* Login route - User can either be a business or a customer, so the route is the same regardless */
router.post('/', function(req, res, next) {
    req.session.destroy((err)=>{
        if(err){
            console.log('ERR');
            next(new Error('Error during sign out process'));
        }
        res.clearCookie(process.env.SESS_NAME)
        res.json({message:'You have successfuly signed out!'})
    });
  
});


module.exports = router;
