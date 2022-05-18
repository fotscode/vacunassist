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
        sede: req.body.sede.nombre,
        role: req.body.role,
        hash: hash,
        salt: salt,
      })
      newUser
        .save()
        .then((user) => {
          sendEmail(req.body.email, pwd)
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
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PWD,
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

exports.logIn = (req, res, next) => {
  User.findOne({ cuil: req.body.cuil })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: 'could not find user' })
      }
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      )

      if (isValid) {
        const jwt = utils.issueJWT(user)

        res.status(200).json({
          success: true,
          user: user,
          token: jwt.token,
          expiresIn: jwt.expires,
        })
      } else {
        return res
          .status(401)
          .json({ success: false, msg: 'you entered the wrong password' })
      }
    })
    .catch((err) => {
      next(err)
    })
}

exports.recover = (req, res, next) => {
  const pwd = crypto.randomBytes(16).toString('hex')
  const saltHash = utils.genPassword(pwd)
  User.findOne({ cuil: req.body.cuil })
    .then((user) => {
      user.hash = saltHash.hash
      user.salt = saltHash.salt
      User.findOneAndUpdate(
        { cuil: req.body.cuil },
        user,
        { upsert: true },
        (err, doc) => {
          if (err) return res.send(500, { error: err })
          sendEmail(user.email, pwd)
          return res.status(200).json({ success: true, msg: 'user updated' })
        }
      )
    })
    .catch((err) => {
      next(err)
    })
}

exports.showUser = (req, res, next) => {
  User.findOne({ _id: req.params.user_id }).then((user) => {
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: 'could not find user' })
    }
    return res.status(200).json(user)
  })
}
exports.updateUser = (req, res, next) => {
  User.findOne({ _id: req.params.user_id })
    .then((user) => {
      user.firstName = req.body.firstName
      user.lastName = req.body.lastName
      user.email = req.body.email
      user.riesgo = req.body.riesgo
      user.sede = req.body.sede.nombre
      User.findOneAndUpdate(
        { _id: req.params.user_id },
        user,
        { upsert: true },
        (err, doc) => {
          if (err) return res.send(500, { error: err })
          return res.status(200).json({ success: true, msg: 'user updated' })
        }
      )
    })
    .catch((err) => {
      next(err)
    })
}
