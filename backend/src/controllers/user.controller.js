const crypto = require('crypto')
const User = require('../models/User')
const utils = require('../lib/utils')
const nodemailer = require('nodemailer')
//TODO CRUD operations
// async/await for db operations
exports.signUp = (req, res, next) => {
  User.findOne({ cuil: req.body.cuil }).then((user) => {
    if (!user) {
      // if user not found, create user, else inform error
      const pwd = crypto.randomBytes(16).toString('hex')
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
        role: req.body.role,
        hash: hash,
        salt: salt,
      })
      newUser
        .save()
        .then((user) => {
          sendEmail(req.body.email,pwd)
          const jwt = utils.issueJWT(user)
          res.status(200).json({
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

const sendEmail = (email, pwd) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vacunassistG26@gmail.com',
      pass: 'vacunassistG26pwd',
    },
  })
  const mailOptions = {
    from: 'vacunassistG26@gmail.com',
    to: email,
    subject: 'Vacunassist - Contraseña',
    text: 'Contraseña: ' + pwd,
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Email enviado' + info.response)
    }
  })
}
