const router = require('express').Router()
const userVaccinesCtrl = require('../controllers/userVaccines.controller')

router.get("/user/:user_id",userVaccinesCtrl.getUsersVaccines)
router.get("/",userVaccinesCtrl.getVaccines)
router.put("/:vaccine_id",userVaccinesCtrl.updateVaccine)
router.put("/cancel/:vaccine_id",userVaccinesCtrl.cancelAppointment)

module.exports=router
