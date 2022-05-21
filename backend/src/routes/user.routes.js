const router = require('express').Router()
const userCtrl = require('../controllers/user.controller')

router.post("/signup",userCtrl.signUp)
router.post("/login",userCtrl.logIn)
router.put("/recover",userCtrl.recover)

router.get("/user",userCtrl.getUsers)
router.get("/user/:user_id",userCtrl.showUser)
router.put("/user/:user_id",userCtrl.updateUser)
router.delete("/user/:user_id",userCtrl.deleteUser)
router.put("/user/validate/:user_id",userCtrl.validateUser)

module.exports=router
