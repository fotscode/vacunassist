const router = require('express').Router()
const userVaccinesCtrl = require('../controllers/userVaccines.controller')

router.get("/user/:user_id",userVaccinesCtrl.getUsersVaccines)

module.exports=router
