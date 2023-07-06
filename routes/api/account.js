var express = require('express');
var router = express.Router();
const moment = require('moment')

const AccountModel = require('../../models/AccountModel');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');

/* GET 记账本列表. */
router.get('/account', checkTokenMiddleware, async function (req, res, next) {
  console.log(req.user)
  try {
    const data = await AccountModel.find().sort({ time: -1 })
    res.json({
      code: "0000",
      msg: "读取成功！",
      data
    })
  } catch (e) {
    res.json({
      code: '1001',
      msg: "读取失败！",
      data: null
    })
  }
});

/* POST 创建 api. */
router.post('/account', checkTokenMiddleware, async function (req, res, next) {
  try {
    const data = await AccountModel.create({ ...req.body, time: moment(req.body.time).toDate() })
    res.json({
      code: "0000",
      msg: "添加成功！",
      data
    })
  } catch (e) {
    res.json({
      code: '1002',
      msg: "添加失败！",
      data: null
    })
  }

});

/* GET 删除 */
router.delete('/account/:id', checkTokenMiddleware, async function (req, res, next) {
  const id = req.params.id
  try {
    const data = await AccountModel.deleteOne({ id })
    res.json({
      code: "0000",
      msg: "删除成功！",
      data:{}
    })
  }catch(e){
    res.json({
      code: '1003',
      msg: "删除失败！",
      data: null
    })
  }
});

// 获取单个账单信息
router.get('/account/:id', checkTokenMiddleware, async function (req, res, next) {
  const id = req.params.id;
  console.log(req.user)
  try {
    const data = await AccountModel.findById(id)
    res.json({
      code: "0000",
      msg: "获取单个账单成功！",
      data
    })
  }catch(e){
    res.json({
      code: '1003',
      msg: "获取单个账单失败！",
      data: null
    })
  }
})

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleware, async function (req, res, next) {
  const id = req.params.id;
  try {
    await AccountModel.updateOne({ _id: id }, req.body)
    const data = await AccountModel.findById(id)
    res.json({
      code: "0000",
      msg: "更新单个账单成功！",
      data
    })
  }catch(e){
    res.json({
      code: '1004',
      msg: "更新单个账单失败！",
      data: null
    })
  }
})

module.exports = router;
