const jwt = require('jsonwebtoken')
const { secrect } = require('../config/config')


module.exports= function(req, res, next) {
  const token = req.get('token')
  if(!token){
    res.json({
      code:2003,
      msg:'token缺失',
      data:null
    })
  }
  jwt.verify(token,secrect,(err, data) => {
    if(err){
      res.json({
        code:2003,
        msg:'token验证失败',
        data:null
      })
    }else{
      req.user = data
      next()
    }
  })
}