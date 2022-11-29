var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require("helmet");
var bodyParser = require('body-parser');
var cors = require('cors');

var indexRouter = require('./routes/index');
var stationsRouter = require('./routes/stations');

var app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(cors());
app.use(cors({ origin: '*' }));

// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200
// }


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('x-powered-by', 'Bogdan Mihaileanu');

app.use('/', indexRouter);
app.use('/stations', stationsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
