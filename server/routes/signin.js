const express = require('express');
const router = express.Router();
const {validUser, getByEmail, getRole} = require('../helpers/validation');
const bcrypt = require('bcrypt');

/* Login route - User can either be a business or a customer, so the route is the same regardless */
router.post('/', async (req, res, next) => {
  if(validUser(req.body)){    
    //Check if user exists
    getRole(req.body.email)
    .then(user =>{
      if(user){
        console.log('user:');
        console.log(user);
        bcrypt.compare(req.body.password, user.password)
        .then(result =>{
          if(result){            
            req.session.user_id = user.user_id;
            req.session.role = user.role;
            req.session.role_id = user.role_id;
            res.status(200).json({message:'Login Success!'});
          }else{
            console.log('Wrong password');
            res.status(400).json('Authentication failed');
          }          
        });
      }else{
        console.log('User does not exist!');
        res.status(400).json('Authentication failed');      
      }
    });
    
  }else{
    console.log('Invalid username or password');
    res.status(400).json('Authentication failed');
  }
  
});


module.exports = router;
