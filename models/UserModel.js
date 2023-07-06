const mongoose = require('mongoose')
 // 创建文档结构对象
 let UserSchema = new mongoose.Schema({
  username:{type:String,required: true},
  password: {type: String,required: true},
});
//创建模型对象
let UserModel = mongoose.model('users',UserSchema)
module.exports = UserModel