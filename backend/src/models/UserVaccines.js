const { Schema, model } = require('mongoose')

const userVaccinesSchema = new Schema(
  {
    userId:{type:String,required:true},
    vaccineId:{type:String,required:true},
    applied:{type:Boolean,required:true},
    modifiable:{type:Boolean,required:true},
    doseNumber:{type:Number,required:true},
    dateIssued:{type:Number,required:false},
    dateConfirmed:{type:Number,required:false},
    dateApplied:{type:Number,required:false},
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

module.exports = model('UserVaccines', userVaccinesSchema)
