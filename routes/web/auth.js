var express = require('express');
const md5 = require('md5')
const UserModel = require('../../models/UserModel');
var router = express.Router();

// 注册页面
router.get("/reg",(req, res) => {
  res.render("auth/reg")
})

// 注册api
router.post("/reg",async (req, res) => {
  await UserModel.create({...req.body,password:md5(req.body.password)})
  res.render('success',{title:'注册成功',url:"/login"});
})

// 登录页面
router.get("/login",(req, res) => {
  res.render("auth/login")
})

//登录 api
router.post("/login",async (req, res) => {
  try{
    const data = await UserModel.findOne({...req.body,password:md5(req.body.password)});
    if(data){
      req.session.username = data.username;
      req.session._id = data._id;
      res.render('success',{title:'登录成功',url:"/account"})
    }else{
      res.send("账号或密码错误！！") 
    }
   return
  }catch(e){
    res.status(500).send('登陆失败 请稍后再试')
  }
})

// 退出登录
router.get('/logout', (req, res) => {
   req.session.destroy(() =>{
    res.render('success',{title:'退出成功',url:"/login"});
  })
})


module.exports = router;