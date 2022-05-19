const { Schema, model } = require('mongoose')
const articleSchema = new Schema(
  {
    title:{type:String,required:true},
    img:{type:String,required:true},
    body:{type:String,required:true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
module.exports= model('Article',articleSchema)
