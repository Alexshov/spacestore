var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    conf = require('./config');

var index = require('./routes/index');
var spacestore = require('./routes/spacestore');
var user = require('./routes/user');
var warehouse = require('./routes/warehouse');
var packman = require('./routes/packman');
var elevator = require('./routes/elevator');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, conf.get('app-view')));
app.set('view engine', conf.get('app-engine'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(conf.get('log-level')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.session({
//     secret: conf.get('session: secret'),
//     key: conf.get('session: key'),
//     cookie: conf.get('session: cookie')
// }))
app.use(express.static(path.join(__dirname, conf.get('app-static'))));


app.use('/', index);
app.use('/spacestore', spacestore);
app.use('/user', user);
app.use('/warehouse', warehouse);
app.use('/packman', packman);
app.use('/elevator', elevator);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
