/*
  model中定义 Schema 类型

*/

module.exports = {
  user: {
    username: {type: String},
    password: {type: String},
    time: {type: Number}
  }
}
// 在数据库中会有一个user的集合，储存用户注册的信息