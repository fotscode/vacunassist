const router = require('express').Router()
const userCtrl = require('../controllers/user.controller')

router.get("/hello",(req,res)=> {res.send("hey")})
router.post("/signup",userCtrl.signUp)
router.post("/login",userCtrl.logIn)

module.exports=router
