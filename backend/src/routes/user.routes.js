const router = require('express').Router()
const userCtrl = require('../controllers/user.controller')

router.get("/hello",(req,res)=> {res.send("hey")})
router.post("/signup",userCtrl.signUp)
router.post("/login",userCtrl.logIn)
router.put("/recover",userCtrl.recover)
router.get("/user/:user_id",userCtrl.showUser)

module.exports=router
