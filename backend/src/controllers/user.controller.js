const crypto=require('crypto')
const User = require('../models/User')
const utils=require('../lib/utils')
//TODO CRUD operations
// async/await for db operations
exports.signUp = (req, res, next) => {
  User.findOne({ cuil: req.body.cuil }).then((user) => {
    if (!user) {
      // if user not found, create user, else inform error
      const pwd=crypto.randomBytes(16).toString('hex')
      const saltHash = utils.genPassword(pwd)
      const hash = saltHash.hash
      const salt = saltHash.salt
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        cuil: req.body.cuil,
        riesgo: req.body.riesgo,
        sede: req.body.sede,
        role:req.body.role,
        hash: hash,
        salt: salt,
      })
      //TODO ELIMINAR ESTO cuando se mande el mail con la password
      console.log("Contrasenia: "+ pwd)
      newUser
        .save()
        .then((user) => {
          const jwt = utils.issueJWT(user)
          res.json({
            success: true,
            user: user,
            token: jwt.token,
            expiresIn: jwt.expires,
          })
        })
        .catch((err) => next(err))
    } else res.status(409).json({ success: false, msg: 'CUIL ya registrado' })
  })
}
