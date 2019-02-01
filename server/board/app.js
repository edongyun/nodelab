var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // views 폴더 지정
app.set('view engine', 'ejs');                    // ejs 엔진 사용

app.use(logger('dev'));
app.use(express.json());  // body로 넘어오는 것을 빈 객체로 만든다.
// app.use(function(req, res, next){
//   console.log(req.body);
//   next();
// });
app.use(express.urlencoded({ extended: false }));  // body의 내용을 추가
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
// delete 방식으로 변환
app.use(function(req, res, next){
  if(typeof req.body == 'object' && '_method' in req.body){
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
});
app.use('/', indexRouter);        // '/' 요청이 오면 indexRouter 사용
app.use('/users', usersRouter);   // '/users' 요청이 오면 usersRouter 사용

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, req.url + ' Not found!!'));
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
