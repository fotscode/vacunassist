const { Router } = require('express')
const router=Router()
const admCtrl = require('../controllers/admin.controller')

router.get("/hello",admCtrl.hello)

module.exports=router
