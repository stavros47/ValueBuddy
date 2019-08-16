const express = require('express');
const router = express.Router();
const database = require('../database');
const { validate, validDetails, getByEmail } = require('../helpers/validation');
const bcrypt = require('bcrypt');
const authorize = require('../helpers/authentication');
const Role = require('../helpers/role');

/* GET all Customers. */
router.get('/', authorize(Role.Admin), function(req, res, next) {
  //Only admins
  database.raw('SELECT * FROM get_customers()').then(data => {
    if (data.rows === undefined || data.rows.length == 0) {
      res.status(404).json({ message: 'Customers not Found!', customers: [] });
    } else {
      res.status(200).json({ customers: data.rows });
    }
  });
});

/* GET a Customer */
router.get('/:id', authorize(), function(req, res, next) {
  //All authorized users
  database.raw(`SELECT * FROM get_customer(${parseInt(req.params.id)})`).then(data => {
    if (data.rows === undefined || data.rows.length == 0) {
      res.status(404).json({ message: 'Customer not Found!', customer: {} });
    } else {
      res.status(200).json({ customer: data.rows[0] });
    }
  });
});

/* Delete a Customer */
router.delete('/:id', authorize(Role.Customer), function(req, res, next) {
  //Customer with :id
  database
    .raw(`SELECT * FROM delete_customer(${parseInt(req.params.id)})`)
    .then(data => {
      console.log('DEL:', data.rows[0].delete_customer);
      if (data.rows === undefined || data.rows.length == 0 || !data.rows[0].delete_customer) {
        res.status(404).json({ message: 'Deletion failed!' });
      } else {
        res.status(200).json({ message: 'Customer was successfuly deleted.' });
        //Should I also logout?
      }
    })
    .catch(error => {
      console.log(error);
      next(new Error('Deletion failed!'));
    });
});

/* GET a Customer's Coupons. */
router.get('/:id/Coupons', authorize([Role.Customer, Role.Admin]), (req, res, next) => {
  //Customer with :id & admins
  database
    .raw(`SELECT * FROM get_customers_coupons(${parseInt(req.params.id)})`)
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res
          .status(404)
          .json({ message: 'Customer did not have any coupons claimed!', coupons: [] });
      } else {
        res.status(200).json({ coupons: data.rows });
      }
    })
    .catch(error => {
      console.log(error);
      next(new Error('Error looking for coupons'));
    });
});

/* GET a Customer's specific Coupon. */
router.get('/:id/Coupons/:coupon_id', authorize([Role.Customer, Role.Admin]), (req, res, next) => {
  //Customer with :id & admins
  database
    .raw(
      `SELECT * FROM get_customers_coupon(${parseInt(req.params.id)},${parseInt(
        req.params.coupon_id
      )})`
    )
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res.status(404).json({ message: 'Coupon not Found!', coupon: {} });
      } else {
        res.status(200).json({ coupon: data.rows[0] });
      }
    })
    .catch(error => {
      console.log(error);
      next(new Error('Error looking for coupon'));
    });
});

/* CREATE(POST) a new Customer*/
router.post('/', function(req, res, next) {
  const userDetails = validate(req.body);
  if (userDetails.allValid) {
    getByEmail(req.body.email).then(user => {
      if (!user) {
        //This is a unique email so hash the password before inserting into the DB
        bcrypt.hash(req.body.password, 8).then(hash => {
          database
            .raw(
              `SELECT * FROM insert_customer(
            '${hash}',
            '${req.body.first_name}',
            '${req.body.last_name}',
            '${req.body.gender}',
            '${req.body.dob}',
            '${req.body.email}',
            '${req.body.phone}',
            '${req.body.address1}',
            '${req.body.address2}',
            '${req.body.city}',
            '${req.body.country}'
            )`
            )
            .then(data => {
              if (data.rows === undefined || data.rows.length == 0) {
                // res.json({message:"Customer not found", customer:{}});
                res.status(400).json({ message: 'Customer signup failed!' });
              } else {
                res.status(201).json({ customer: data.rows });
              }
            })
            .catch(error => {
              console.log(error);
              res.send('Customer signup failed!');
            });
        });
      } else {
        console.log('Signup: Email already in use.');
        res.status(400).json({ message: 'Customer signup failed!' });
      }
    });
  } else {
    res.json({ message: 'Invalid User Info', ...userDetails });
  }
});

/* update a Customer 
Cannot change email for now ${req.body.email ? `'${req.body.email}'` : `NULL`},
*/
// ToDo: Validation and test unique email constraints
router.put('/:id', authorize(Role.Customer), function(req, res, next) {
  //Customer with :id
  database
    .raw(
      `SELECT * FROM update_customer(
    ${parseInt(req.params.id)},
    ${req.body.first_name ? `'${req.body.first_name}'` : `NULL`},
    ${req.body.last_name ? `'${req.body.last_name}'` : `NULL`},
    ${req.body.dob ? `'${req.body.dob}'` : `NULL`},
    ${req.body.phone ? `'${req.body.phone}'` : `NULL`}  
  )`
    )
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res.json({ message: 'Could not update Customer' });
      } else {
        res.json({ result: data.rows });
      }
    })
    .catch(error => {
      console.log(error);
      res.send('ERROR!');
    });
});

module.exports = router;
