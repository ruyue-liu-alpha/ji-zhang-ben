var express = require('express');
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/UserModel');
const { secrect } = require('../../config/config');

var router = express.Router();

//登录 api
router.post("/login",async (req, res) => {
  try{
    const data = await UserModel.findOne({...req.body,password:md5(req.body.password)});
    if(data){
      const token = jwt.sign({username: data.username, _id:data._id}, secrect,{expiresIn: 60 * 60 *24 * 7})
      res.json({
        cpde:'2000',
        msg:'登陆成功',
        data:token
      })
    }else{
      res.json({
        cpde:'2002',
        msg:'账号或密码错误！！',
        data:null
      })
    }
  }catch(e){
    res.json({
      cpde:'2001',
      msg:'登陆失败 请稍后再试',
      data:null
    })
  }
})

// 退出登录
router.get('/logout', (req, res) => {
   req.session.destroy(() =>{
    res.render('success',{title:'退出成功',url:"/login"});
  })
})


module.exports = router;