const crypto = require('crypto')
const User = require('../models/User')
const UserVaccines = require('../models/UserVaccines')
const utils = require('../lib/utils')
const nodemailer = require('nodemailer')
//TODO CRUD operations
// async/await for db operations

const insertVaccines = async (vacunas, id) => {
  const newUsersVaccines = []
  Object.entries(vacunas).forEach(([k, v]) => {
    if (v.dosis > 0) {
      let newUserVaccine = {
        userId: id,
        vaccineId: k,
        applied: true,
        modifiable: true,
        doseNumber: v.dosis,
        dateApplied: new Date(v.fecha).getTime(),
      }
      newUsersVaccines.push(newUserVaccine)
    }
  })
  return await UserVaccines.insertMany(newUsersVaccines)
}

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
        fechaNac: new Date(req.body.fecha).getTime(),
        validated: req.body.validated,
        hash: hash,
        salt: salt,
      })
      newUser
        .save()
        .then((user) => {
          insertVaccines(req.body.vacunas, user._id)
            .then((docs) => {
              sendEmail(req.body.email, pwd, user.cuil)
              const jwt = utils.issueJWT(user)
              res.status(200).json({
                success: true,
                user: user,
                token: jwt.token,
                expiresIn: jwt.expires,
              })
            })
            .catch((err) => {
              next(err)
            })
        })
        .catch((err) => next(err))
    } else res.status(409).json({ success: false, msg: 'CUIL ya registrado' })
  })
}

const sendEmail = (email, pwd, cuil) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PWD,
    },
  })
  const mailOptions = {
    from: process.env.EMAIL_ACCOUNT,
    to: email,
    subject: 'Vacunassist - Contraseña',
    text: `CUIL: ${cuil}, Contraseña: ${pwd}`,
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Email enviado ' + info.response)
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
      return res.send(409, { error: err, msg: 'user not found' })
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
          if (err)
            return res.send(409, { error: err, msg: 'CUIL no encontrado' })
          sendEmail(user.email, pwd, user.cuil)
          return res.status(200).json({ success: true, msg: 'user updated' })
        }
      )
    })
    .catch((err) => {
      return res.send(409, { error: err, msg: 'CUIL no encontrado' })
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
          if (err) return res.send(409, { error: err, msg: 'user not found' })
          return res.status(200).json({ success: true, msg: 'user updated' })
        }
      )
    })
    .catch((err) => {
      return res.send(409, { error: err, msg: 'user not found' })
    })
}

exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users) {
        res.status(200).json(users)
      } else
        return res
          .status(401)
          .json({ success: false, msg: 'no se encontraron usuarios' })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({ success: false, msg: 'error inesperado' })
    })
}

exports.validateUser = (req, res, next) => {
  if (Math.random() > 0.1) {
    User.find({ _id: req.params.user_id })
      .then((user) => {
        user = user[0]
        user.validated = true
        User.findOneAndUpdate(
          { _id: req.params.user_id },
          user,
          { upsert: true },
          (err, doc) => {
            if (err) return res.send(409, { error: err, msg: 'user not found' })
            return res.status(200).json({ success: true, msg: 'user updated' })
          }
        )
      })
      .catch((err) => {
        return res.send(409, { error: err, msg: 'user not found' })
      })
  } else {
    res
      .status(406)
      .send({ success: false, msg: 'no se pudo validar el usuario' })
  }
}

exports.deleteUser = (req, res, next) => {
  UserVaccines.deleteMany({ userId: req.params.user_id })
    .then((info) => {
      User.findOneAndDelete({ _id: req.params.user_id })
        .then((user) => {
          return res.status(200).json({ success: true, msg: 'user deleted' })
        })
        .catch((err) => {
          return res.send(409, { error: err, msg: 'user not found' })
        })
    })
    .catch((err) => {
      return res.status(500).json({ err, msg: 'unexpected error' })
    })
}
