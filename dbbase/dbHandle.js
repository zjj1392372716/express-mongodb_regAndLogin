var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./model");  // 引入model

// 遍历 各 schema 类型
for(var m in models){
  // 创建模型
	mongoose.model(m,new Schema(models[m]));
}

// 私有方法
var _getModel = function(type){ 
	return mongoose.model(type); // 将模型抛出
};

// type 为需要使用的 schema 名称
module.exports = { 
	getModel: function(type){ 
		return _getModel(type);
	}
};