
const createError = require('http-errors');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const session = require('express-session');

/* Include the express framework and invoke it*/
const express = require('express');
const app = express();

/*Middleware*/
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const ONE_HOUR = 1000 * 60 * 60

const {
  SESS_NAME = 'ssid',
  SESS_SECRET = 'ssh1quiet,it\'asecret!',
  NODE_ENV = 'development',
  SESS_LIFETIME = ONE_HOUR
} = process.env

const IN_PROD = NODE_ENV === 'production';

app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie:{
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD
  }
}));

var indexRouter = require('./routes');
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
