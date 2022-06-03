const UserVaccines = require('../models/UserVaccines')

exports.getUsersVaccines = (req, res, next) => {
  UserVaccines.find({ userId: req.params.user_id })
    .then((vaccines) => {
      if (vaccines) {
        res.status(200).json(vaccines)
      } else
        return res
          .status(401)
          .json({ success: false, msg: 'no se vacunas asociadas al usuario' })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({ success: false, msg: 'error inesperado' })
    })
}

exports.getVaccines = (req, res, next) => {
  UserVaccines.find({})
    .then((vaccines) => {
      if (vaccines) res.status(200).json(vaccines)
      else
        return res
          .status(401)
          .json({ success: false, msg: 'no se vacunas asociadas al usuario' })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({ success: false, msg: 'error inesperado' })
    })
}
exports.updateVaccine=(req,res,next)=>{
  UserVaccines.findByIdAndUpdate(req.params.vaccine_id,req.body,{upsert:true},(err,docs)=>{
    if (err){
      console.log(docs)
      return res.status(409).json({success:false,msg:'no se pudo actualizar la vacuna'})
    }
  })
}
