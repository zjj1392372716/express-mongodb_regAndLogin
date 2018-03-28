var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// 注册页面
router.route("/register").get(function (req, res) {
  res.render("register", { title: '用户注册' });
}).post(function (req, res) {
  // 这里的User就是从model中获取 user 对象，通过 global.dbHandel 全局方法（这个方法在app.js中已经实现)
  var User = global.dbHandel.getModel('user');
  var uname = req.body.username;
  var upwd = req.body.password;
  User.findOne({ username: uname }, function (err, doc) {
    // 判断该用户名是否已经注册
    if (err) {
      res.send(500);
      req.session.error = '网络异常错误！';
      console.log(err);
    } else if (doc) {
      req.session.error = '用户名已存在！';
      res.send(500);
    } else {
      User.create({ 							// 创建一组user对象置入model
        username: uname,
        password: upwd,
        time: new Date().getTime()
      }, function (err, doc) {
        if (err) {
          res.send(500);
          console.log(err);
        } else {
          req.session.error = '用户名创建成功！';
          res.send(200);
        }
      });
    }
  });
});

// 登陆页面
router.route('/login').get(function (req, res) {
  res.render('login', {
    title: '用户登陆'
  })
}).post(function (req, res) {
  var User = global.dbHandel.getModel('user');
  var username = req.body.username;
  User.findOne({ username: username }, function (err, doc) {
    if (err) {
      res.send(500)
      console.log(err)
    } else if (!doc) {
      res.session.error = '用户名不存在';
      res.send(500);
    } else {
      if (req.body.password != doc.password) {
        req.session.error = "密码错误";
        res.send(404);
      } else {
        req.session.user = doc;
        res.send(200);
      }
    }
  })
})

router.route('/home').get(function (req, res) {
  if (!req.session.user) { 					//到达/home路径首先判断是否已经登录
    req.session.error = "请先登录"
    res.redirect("/login");				//未登录则重定向到 /login 路径
  }
  res.render("home", { title: 'Home' });
})

router.route('/loginout').get(function(req, res) {
  req.session.user = null;
	req.session.error = null;
	res.redirect("/");
})

module.exports = router;
