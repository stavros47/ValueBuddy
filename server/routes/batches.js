const express = require('express');
const router = express.Router();
const database = require('../database');
const authorize = require('../helpers/authentication');
const Role = require('../helpers/role');

/* GET all Batches. 
Todo: 
- Everyone should get only the active batches
- If a business requests to this route expired and deactivated batches should be returned
- perhaps I could pass the id in the sql function and change the query.
*/
//All authorized users
router.get('/', authorize(), function(req, res, next) {
  if (req.user.role === 'customer') {
    database
      .raw(
        `SELECT * FROM get_customer_available_batches_byCategory(${req.user.role_id}, ${req.query.categoryID}, ${req.query.orderBy},${req.query.isAsc})`
      )
      .then(data => {
        if (data.rows === undefined || data.rows.length == 0) {
          res.status(404).json({ message: 'No Batches were Found!', batches: [] });
        } else {
          res.status(200).json({ batches: data.rows });
        }
      });
  } else if (req.user.role === 'business') {
    database.raw('SELECT * FROM get_batches()').then(data => {
      if (data.rows === undefined || data.rows.length == 0) {
        res.status(404);
        res.json({ message: 'No Batches were Found!', batches: [] });
      } else {
        res.status(200);
        res.json({ batches: data.rows });
      }
    });
  }
});

/* GET a Batch */
router.get('/:batch_id', authorize(), function(req, res, next) {
  //All authorized users
  database.raw(`SELECT * FROM get_batch(${parseInt(req.params.batch_id)})`).then(data => {
    if (data.rows === undefined || data.rows.length == 0) {
      res.status(404).json({ message: 'Batch not Found!', batch: {} });
    } else {
      res.status(200).json({ batch: data.rows[0] });
    }
  });
});

/*GET All coupons that are instances of a specific batch 
ToDo: Only the business that owns the batch 
*/
router.get('/:batch_id/Coupons', authorize(Role.Admin), function(req, res, next) {
  //All authorized admins
  database.raw(`SELECT * FROM get_batch_coupons(${parseInt(req.params.batch_id)})`).then(data => {
    if (data.rows === undefined || data.rows.length == 0) {
      res.json({
        message: `No coupons were claimed from batch_id:${req.params.batch_id}`,
        coupons: {},
      });
    } else {
      res.json({ coupons: data.rows });
    }
  });
});

/* CREATE(POST) a new Batch*/
router.post('/', authorize(Role.Admin), function(req, res, next) {
  //All authorized admins
  database
    .raw(
      `SELECT * FROM insert_batch(${parseInt(req.body.template_id)},
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
      res.send('ERROR!');
    });
});

module.exports = router;
