const { Schema, model } = require('mongoose')
const siteSchema = new Schema(
  {
    name:{type:String,required:true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
module.exports= model('Site',siteSchema)
