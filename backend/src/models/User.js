const {Schema, model}=require('mongoose')

const userSchema=new Schema({
  firstName:{type:String,required:true},
  lastName:{type:String,required:true},
  email:{type:String,required:true},
  cuil:{type:String,required:true},
  riesgo:{type:String,required:true},
  sede:{type:String,required:true},
  role:{type:Number,required:true},
  fechaNac:{type:Number,required:true},
  hash:{type:String,required:true},
  salt:{type:String,required:true},
},{
    timestamps:true,
    versionKey:false
  }
)

module.exports= model('User',userSchema)
