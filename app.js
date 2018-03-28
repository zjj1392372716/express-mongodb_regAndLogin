var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // 引入express-session
var routers = require('./routes/index'); // 首页路由内容
var users = require('./routes/users');    // 其他路由内容

var app = express();
var mongoose = require('mongoose');

// 引入 封装好的 mongoose 操作
global.dbHandel = require('./dbbase/dbHandle');
// 连接数据库
global.db = mongoose.connect("mongodb://localhost:27017/meilstest");

app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));
//【第一步】 view engine 的修改
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").__express);
//app.set("view engine","ejs");   最开始默认是以ejs为模板的
app.set('view engine', 'html'); // 改为以 html 文件为模板


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 使用中间件对静态资源管理
app.use(express.static(path.join(__dirname, 'public')));


// 路由配置
app.use('/', routers);
app.use('/users', users);
app.use('/login', routers);
app.use('/register', routers);
app.use('/home', routers);
app.use('/logout', routers);





// catch 404 and forward to error handler
// 当捕获到404的时候，就 执行错误方案
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误提示页面
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
