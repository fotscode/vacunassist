const UserVaccines = require('../models/UserVaccines')

exports.getUsersVaccines = (req, res, next) => {
  UserVaccines.find({userId:req.params.user_id})
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
