
const adminCtrl={}

const Admin = require('../models/Admin')
//TODO CRUD operations
// async/await for db operations
adminCtrl.hello = (req,res)=>{
  res.send("hello admin")
}

module.exports=adminCtrl
