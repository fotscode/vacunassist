const {Schema, model}=require('mongoose')
const ROLES=require('./Roles')

// TODO fill with other data
const adminSchema=new Schema({
  name:{type:String,required:true},
  role:ROLES.ADMIN
},{
    timestamps:true,
    versionKey:false
  }
)

module.exports= model('Admin',adminSchema)
