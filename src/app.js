require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// For Passport
app.use(session({
  secret: 'secret cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var models = require("./app/models");
require('./app/support/auth/passport-local-strategy')(passport, models.User);

// make authenticated user accessible in views
app.use(function (req, res, next) {
  res.locals.auth_user = req.user;
  res.locals.request = req;

  next();
});

var indexRouter = require('./routes/index');
var companyRouter = require('./routes/company');
var authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/company', companyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
