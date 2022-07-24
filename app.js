const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moment = require('moment');
// const livereload = require("livereload");
// const connectLiveReload = require("connect-livereload");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(path.join(__dirname, 'public'));
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// });

const app = express();
app.locals.moment = moment;
// app.use(connectLiveReload());
// const port = 5000

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//The 404 Route (ALWAYS Keep this as the last route)
// app.get('*', function(req, res){
//   res.sendFile(__dirname + '/pages/template-404.ejs');
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(8080);
// console.log('8080 is the magic port');
app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
// app.listen(port, () => console.info(`App listening on port ${port}`))

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', {page:'Home', menuId:'home'});
// });

module.exports = app;
