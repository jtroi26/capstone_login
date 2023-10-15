var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const sessions = require('express-session');
const rateLimit = require('express-rate-limit');

// npm install express nodemon session rate-limit

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminprofRouter = require('./routes/adminprof');
var adminRouter = require('./routes/admin');
var profRouter = require('./routes/prof');
var studentRouter = require('./routes/student');
var addsubjectRouter = require('./routes/addsubject');
var addprof_to_subjectRouter = require('./routes/addprof_to_subject');
var addstudent_to_subjectRouter = require('./routes/addstudent_to_subject');
var studentloginRouter = require('./routes/studentlogin');
var studentmoduleRouter = require('./routes/studentmodule');
var logoutRouter = require('./routes/logout');


var app = express();

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 60000, // 60 secs in milliseconds
  },
}));



const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Allow 3 login attempts per IP address within the windowMs
  message: 'Too many login attempts from this IP, please try again later.',
});

const PORT = process.env.PORT ||5000;

app.listen(PORT, console.log(
  `Server is running http://localhost:${PORT}/`
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', adminprofRouter);
app.use('/', adminRouter);
app.use('/', profRouter);
app.use('/', studentRouter);
app.use('/', addsubjectRouter);
app.use('/', addprof_to_subjectRouter);
app.use('/', addstudent_to_subjectRouter);
app.use('/', studentloginRouter);
app.use('/', studentmoduleRouter);
app.use('/', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
