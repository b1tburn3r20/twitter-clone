var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');



var postRouter = require('./routes/home');
var registerRouter = require('./routes/register')


var app = express();
const methodOverride = require('method-override')

require('dotenv').config();
require('./config/connection');
require('./config/passport');


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
app.get('/', (req, res) => {
  res.redirect('/posts');
});

app.use('/posts', postRouter);
app.use('/register', registerRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
}); ``

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
