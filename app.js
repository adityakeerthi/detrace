var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var geoDataRouter = require('./routes/geoData');
// var apiRouter = require('./routes/api');
var getCovidStatusRouter = require('./routes/getCovidStatus');
var changeCovidStatusRouter = require('./routes/changeCovidStatus');
var addContactRouter= require('./routes/addContact');
var checkCoronaRouter = require('./routes/checkCorona');
var checkSecondaryRouter = require('./routes/checkSecondary');
var clearArrRouter = require('./routes/clearArr');
var getConnectionRouter = require('./routes/getConnection')
var getTreeRouter = require('./routes/getTree');
var setTreeRouter = require('./routes/setTree');
var getContentsMDBRouter = require('./routes/getContentsMDB')
var cors = require('cors');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getCovidStatus', getCovidStatusRouter);
app.use('/changeCovidStatus', changeCovidStatusRouter);
app.use('/addContact', addContactRouter);
app.use('/checkCorona', checkCoronaRouter);
app.use('/checkSecondary', checkSecondaryRouter);
app.use('/clearArr', clearArrRouter);
app.use('/getConnection', getConnectionRouter);
app.use('/getTree', getTreeRouter);
app.use('/setTree', setTreeRouter);
app.use('/getContentsMDB', getContentsMDBRouter);
app.use('/geoData', geoDataRouter);

// app.use('/api', apiRouter);
app.use('/geoData', geoDataRouter);

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
