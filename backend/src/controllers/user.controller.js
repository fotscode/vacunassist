const crypto = require('crypto')
const User = require('../models/User')
const UserVaccines = require('../models/UserVaccines')
const utils = require('../lib/utils')
const nodemailer = require('nodemailer')

const insertVaccines = async (vacunas, id) => {
  const newUsersVaccines = []
  Object.entries(vacunas).forEach(([k, v]) => {
    let newUserVaccine = {
      userId: id,
      vaccineId: k,
      applied: false,
      modifiable: true,
      doseNumber: v.dosis,
      dateApplied: new Date(v.fecha).getTime(),
    }
    newUsersVaccines.push(newUserVaccine)
  })
  return await UserVaccines.insertMany(newUsersVaccines)
}

exports.signUp = (req, res, next) => {
  User.findOne({ cuil: req.body.cuil.trim() }).then((user) => {
    if (!user) {
      // if user not found, create user, else inform error
      const pwd = crypto.randomBytes(16).toString('hex')
      const saltHash = utils.genPassword(pwd)
      const hash = saltHash.hash
      const salt = saltHash.salt
      const newUser = new User({
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        email: req.body.email.trim(),
        cuil: req.body.cuil.trim(),
        riesgo: req.body.riesgo,
        sede: req.body.sede.name.trim(),
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
              sendEmail(req.body.email.trim(), pwd, user.cuil.trim())
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
  User.findOne({ cuil: req.body.cuil.trim() })
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
        { cuil: req.body.cuil.trim() },
        user,
        { upsert: true },
        (err, doc) => {
          if (err)
            return res.send(409, { error: err, msg: 'CUIL no encontrado' })
          sendEmail(user.email.trim(), pwd, user.cuil.trim())
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
      User.findOne({ cuil: req.body.cuil }).then((u) => {
        if (u&&u.cuil!=user.cuil) {
          return res.send(409, { msg: 'CUIL ya registrado'  })
        } else {
          user.firstName = req.body.firstName.trim()
          user.lastName = req.body.lastName.trim()
          user.email = req.body.email.trim()
          user.riesgo = req.body.riesgo
          user.role = req.body.role
          user.cuil = req.body.cuil
          user.sede = req.body.sede.name.trim()
          user.fechaNac = new Date(req.body.fechaNac).getTime()
          User.findOneAndUpdate(
            { _id: req.params.user_id },
            user,
            { upsert: true },
            (err, doc) => {
              if (err)
                return res.send(409, { error: err, msg: 'user not found' })
              UserVaccines.find({ userId: req.params.user_id })
                .then((vaccines) => {
                  if (vaccines) {
                    vaccines.forEach((vac) => {
                      let dataToUpdate = Object.entries(
                        req.body.vacunas
                      ).filter(([k, v]) => k === vac.vaccineId)
                      if (dataToUpdate) {
                        dataToUpdate = dataToUpdate[0][1]
                      }
                      vac.doseNumber = dataToUpdate.dosis
                      vac.dateApplied = new Date(dataToUpdate.fecha).getTime()
                      UserVaccines.findOneAndUpdate(
                        { _id: vac._id },
                        vac,
                        { upsert: true },
                        (err, doc) => {
                          if (err) console.log(err)
                        }
                      )
                    })
                    return res
                      .status(200)
                      .json({ success: true, msg: 'user updated' })
                  } else
                    return res.send(409, {
                      error: err,
                      msg: 'vaccines not found2',
                    })
                })
                .catch((err) => {
                  return res.send(409, {
                    error: err,
                    msg: 'vaccines not found',
                  })
                })
            }
          )
        }
      })
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
