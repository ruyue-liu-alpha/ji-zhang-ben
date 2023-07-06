var express = require('express');
const moment = require('moment')
const AccountModel = require('../../models/AccountModel');
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware');

var router = express.Router();

//首页路由规则
router.get('/', function(req, res, next) {
  res.redirect("/account")
});
/* GET 记账本列表. */
router.get('/account', checkLoginMiddleware, function(req, res, next) {
  AccountModel.find().sort({time:-1}).then((list) => {
    res.render('list',{list, moment});
  }).catch(() => {
    res.status(500).send("读取失败！")
  })
});
/* GET 创建页面 */
router.get('/account/create', checkLoginMiddleware, function(req, res, next) {
  res.render('create');
});

/* POST 创建 api. */
router.post('/account', checkLoginMiddleware,  function(req, res, next) {
  AccountModel.create({...req.body,time:moment(req.body.time).toDate()}).then(data =>{
    res.render('success',{title:'添加成功',url:"/account"});
  }).catch(err => {
    res.render('fail',{title:'添加失败',url:"/account"});
  })
  
  
});

/* GET 删除 */
router.get('/account/:id', checkLoginMiddleware, function(req, res, next) {
  const id = req.params.id
  AccountModel.deleteOne({id}).then(
    res.render('success',{title:'删除成功',url:"/account"})
  )
});

module.exports = router;
