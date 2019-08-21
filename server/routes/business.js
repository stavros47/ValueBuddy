const express = require('express');
const router = express.Router();
const database = require('../database');
const { businesses, businessByID } = require('../database/queries');

const { validate, validDetails, getByEmail } = require('../helpers/validation');
const bcrypt = require('bcrypt');
const authorize = require('../helpers/authentication');
const Role = require('../helpers/role');

/* GET all Businesses. */
router.get('/', authorize(), function(req, res, next) {
  //all authorized users
  businesses().then(data => {
    if (data.rows === undefined || data.rows.length == 0) {
      res.status(404);
      res.json({ message: 'No businesses were Found!', businesses: [] });
    } else {
      res.status(200);
      res.json({ businesses: data.rows });
    }
  });
});

/* GET a Business */
router.get('/:id', authorize(), function(req, res, next) {
  //all authorized users
  // database.raw(`SELECT * FROM get_business(${parseInt(req.params.id)})`)
  businessByID(parseInt(req.params.id))
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res.status(404).json({ message: 'Business not Found!', business: {} });
      } else {
        res.status(200).json({ business: data.rows[0] });
      }
    })
    .catch(e => console.log(e));
});

/* Delete a Business */
router.delete('/:id', authorize(Role.Business), function(req, res, next) {
  //Only the business with :id
  console.log('This function is not yet implemented in postgres');
  res.status(404).json({ message: 'Deletion failed!' });
  // database.raw(`SELECT * FROM delete_business(${parseInt(req.params.id)})`)
  // .then(data =>{
  //   console.log('DEL:', data.rows[0].delete_business);
  //   if(data.rows === undefined || data.rows.length == 0 || !data.rows[0].delete_business){
  //     res.status(404).json({message:"Deletion failed!" });
  //   }else{
  //     res.status(200).json({message:'Business was successfuly deleted.'});
  //     //Should I also logout?
  //   }
  // }).catch(error =>{console.log(error);  next(new Error('Deletion failed!'));});
});

/* CREATE(signup) a new Business*/
router.post('/', function(req, res, next) {
  const userDetails = validate(req.body);
  if (userDetails.allValid) {
    getByEmail(req.body.email).then(user => {
      if (!user) {
        //This is a unique email so hash the password before inserting into the DB
        bcrypt.hash(req.body.password, 8).then(hash => {
          database
            .raw(
              `SELECT * FROM insert_business( 
            '${hash}',
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
            )`
            )
            .then(data => {
              if (data.rows === undefined || data.rows.length == 0) {
                //res.json({message:"Business not found", business:{}});
                res.status(400).json({ message: 'Business signup failed!' });
              } else {
                res.status(201).json({ business: data.rows });
              }
            })
            .catch(error => {
              console.log(error);
              res.send('ERROR!');
            });
        });
      } else {
        //email in use
        console.log('Signup: Email already in use.');
        res.status(400).json({ message: 'Business signup failed!' });
      }
    });
  } else {
    res.json({ message: 'Invalid User Info', ...userDetails });
  }
});
/* update a business */
/*cannot change email for now   ${req.body.email ? `'${req.body.email}'` : `NULL`}, */
// ToDo: Validations and test unique email constraints
router.put('/:id', authorize(Role.Business), function(req, res, next) {
  //Only the business with :id
  database
    .raw(
      `SELECT * FROM update_business(
      ${parseInt(req.params.id)},
      ${req.body.business_name ? `'${req.body.business_name}'` : `NULL`},
      ${req.body.business_type ? `'${req.body.business_type}'` : `NULL`},
      ${req.body.websiteURL ? `'${req.body.websiteURL}'` : `NULL`},      
      ${req.body.phone ? `'${req.body.phone}'` : `NULL`},
      ${req.body.about ? `'${req.body.about}'` : `NULL`}  
    )`
    )
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0 || data.rows.update_business === false) {
        res.json({ message: 'Could not update Business' });
      } else {
        res.json({ result: data.rows });
      }
    })
    .catch(error => {
      console.log(error);
      res.send('ERROR!');
    });
});

//BATCHES:

/* GET all Batches of a specific business. */
router.get('/:id/Batches', authorize(), function(req, res, next) {
  //all authorized users
  database.raw(`SELECT * FROM get_business_batches(${parseInt(req.params.id)})`).then(data => {
    if (data.rows === undefined || data.rows.length == 0) {
      res.status(404).json({ message: 'No Coupon batches!', batches: [] });
    } else {
      res.status(200).json({ batches: data.rows });
    }
  });
});

/* GET all batches made from a specific template, of a specific business. */
router.get('/:id/Templates/:template_id/Batches', authorize(Role.Business), function(
  req,
  res,
  next
) {
  //Only the business with :id
  database
    .raw(
      `SELECT * FROM get_business_template_batches(${parseInt(req.params.id)},${parseInt(
        req.params.template_id
      )})`
    )
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res.status(404).json({ message: 'No Batches found!', batches: [] });
      } else {
        res.status(200).json({ batches: data.rows });
      }
    });
});

/* CREATE(POST) a new Batch */
router.post('/:id/Templates/:template_id/Batches', authorize(Role.Business), function(
  req,
  res,
  next
) {
  //Only the business with :id

  database
    .raw(
      `SELECT * FROM insert_business_template_batch(
    ${parseInt(req.params.id)},
    ${parseInt(req.params.template_id)},
    ${parseInt(req.body.created_count)}, 
    '${req.body.start_date}', 
    '${req.body.expiry_date}', 
    ${parseInt(req.body.status_id)})`
    )
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res.status(404).json({ message: 'Batch was not created', batch: {} });
      } else {
        res.status(200).json({ batch: data.rows });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).send('ERROR!');
    });
});

/* GET a batch. even inactive ones or expired */
router.get('/:id/Batches/:batch_id', authorize([Role.Business, Role.Admin]), function(
  req,
  res,
  next
) {
  //Only the business with :id or an admin
  database
    .raw(
      `SELECT * FROM get_business_batch(${parseInt(req.params.id)},${parseInt(
        req.params.batch_id
      )})`
    )
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res.status(404).json({ message: 'Batch not found!', batch: {} });
      } else {
        res.status(200).json({ batch: data.rows });
      }
    });
});

/* Update a batch of a specific business */
router.put('/:id/Batches/:batch_id', authorize([Role.Business, Role.Admin]), function(
  req,
  res,
  next
) {
  //Only the business with :id or an admin
});

//TEMPLATES:

/* GET all Templates of a specific business. */
router.get('/:id/Templates', authorize(Role.Business), function(req, res, next) {
  //Only the business with :id
  database
    .raw(`SELECT * FROM get_business_templates(${parseInt(req.params.id)})`)
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res.status(404).json({
          message: 'Business does not have any Coupon templates!',
          templates: [],
        });
      } else {
        res.status(200).json({ templates: data.rows });
      }
    })
    .catch(error => {
      console.log(error);
      res.send('ERROR!');
    });
});

/* CREATE(POST) a new coupon Template*/
router.post('/:id/Templates', authorize(Role.Business), function(req, res, next) {
  //Only the business with :id
  console.log(req.body.description, req.body.discount_type, req.body.discount);
  database
    .raw(
      `SELECT * FROM insert_template(${parseInt(req.params.id)},
    '${req.body.description}', 
    '${req.body.discount_type}', 
    ${parseInt(req.body.discount)})`
    )
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res.status(404).json({ message: 'Template not created!', template: {} });
      } else {
        res.status(200).json({ template: data.rows });
      }
    })
    .catch(error => {
      console.log(error);
      res.send('ERROR!');
    });
});

/* GET a Template of a specific business. */
router.get('/:id/Templates/:template_id', authorize(Role.Business), function(req, res, next) {
  //Only the business with :id
  database
    .raw(
      `SELECT * FROM get_business_template(${parseInt(req.params.id)},${parseInt(
        req.params.template_id
      )})`
    )
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res.status(404).json({ message: 'Coupon template not found!', template: {} });
      } else {
        res.status(200).json({ template: data.rows });
      }
    });
});

/* Update a Template of a specific business. */
router.put('/:id/Templates/:template_id', authorize(Role.Business), function(req, res, next) {
  //Only the business with :id
  database
    .raw(
      `SELECT * FROM update_template(${parseInt(req.params.id)},
  ${parseInt(req.params.template_id)},
  '${req.body.description}', 
  '${req.body.discount_type}', 
  ${parseInt(req.body.discount)})`
    )
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res.status(400).json({ message: 'Template not created!', template: {} });
      } else {
        res.status(200).json({ template: data.rows });
      }
    })
    .catch(error => {
      console.log(error);
      res.send('ERROR!');
    });
});

//Coupons

/* GET all claimed coupons from ALL BATCHES, that belong to a specific business. */
router.get('/:id/Coupons', authorize(Role.Business), function(req, res, next) {
  //Only the business with :id
  database.raw(`SELECT * FROM get_business_coupons(${parseInt(req.params.id)})`).then(data => {
    if (data.rows === undefined || data.rows.length == 0) {
      res.status(404).json({
        message: `No coupons from business_id:${req.params.id} were claimed.`,
        coupons: [],
      });
    } else {
      res.status(200).json({ coupons: data.rows });
    }
  });
});

/* GET all coupons for a batch */
router.get('/:id/Batches/:batch_id/Coupons', authorize(Role.Business), function(req, res, next) {
  //Only the business with :id
  database
    .raw(
      `SELECT * FROM get_business_batch_coupons(${parseInt(req.params.id)},${parseInt(
        req.params.batch_id
      )})`
    )
    .then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res.status(404).json({ message: `No coupons found!`, coupons: [] });
      } else {
        res.status(200).json({ coupons: data.rows });
      }
    });
});

router.post('/:id/Batches/:batch_id/Coupons', authorize(), function(req, res, next) {
  database
    .raw(
      `SELECT * FROM claim_from_batch(${parseInt(req.params.id)},${parseInt(
        req.params.batch_id
      )},${parseInt(req.user.role_id)})`
    )
    .then(data => {
      if (
        data.rows === undefined ||
        data.rows.length == 0 ||
        data.rows[0].claim_from_batch === -1
      ) {
        res.status(404).json({
          message: `Could not claim a coupon from batch: ${req.params.batch_id}`,
          isClaimed: false,
        });
      } else {
        res.status(201).json({ isClaimed: true, coupon_id: data.rows[0].claim_from_batch });
      }
    });
});
module.exports = router;
