const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session');

//import routes
const index = require('./routes/index');
const pic = require('./routes/pic');
const webhook = require('./routes/webhook');
const pics = require('./routes/api/pics');
const create = require('./routes/create');
/***************Mongodb configuratrion********************/
const mongoose = require('mongoose');
mongoose.connect(process.env.mongodb); // connect to our database
//configuration ===============================================================

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//passport
app.use(session({
   secret: process.env.session_secret,
   resave: true,
   saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
app.use('/', index);
app.use('/webhook', webhook);
app.use('/pics', pic);
app.use('/create', create);
app.use('/api/pics', pics);
require('./config/passport')(passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
