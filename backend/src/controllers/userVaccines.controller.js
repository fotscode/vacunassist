const UserVaccines = require('../models/UserVaccines')
const User = require('../models/User')
const nodemailer = require('nodemailer')

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
exports.updateVaccine = (req, res, next) => {
  UserVaccines.findByIdAndUpdate(
    req.params.vaccine_id,
    req.body,
    { upsert: true },
    (err, docs) => {
      if (err) {
        return res
          .status(409)
          .json({ success: false, msg: 'no se pudo actualizar la vacuna' })
      } else {
        return res
          .status(200)
          .json({ success: true, msg: 'se actualizo la vacuna' })
      }
    }
  )
}

exports.cancelAppointment = (req, res, next) => {
  UserVaccines.findByIdAndUpdate(
    { _id: req.params.vaccine_id },
    {
      dateIssued: 0,
      dateConfirmed: 0,
      modifiable: !req.body.applied,
      sede: '',
    },
    { upsert: true },
    (err, docs) => {
      if (err) {
        console.log(docs)
        return res
          .status(409)
          .json({ success: false, msg: 'no se pudo actualizar la vacuna' })
      } else {
        return res
          .status(200)
          .json({ success: true, msg: 'se actualizo la vacuna' })
      }
    }
  )
}

exports.getVaccine = (req, res, next) => {
  UserVaccines.findById({ _id: req.params.vaccine_id })
    .then((vaccine) => {
      if (vaccine) res.status(200).json(vaccine)
      else
        return res
          .status(401)
          .json({ success: false, msg: 'no se encontro la vacuna' })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({ success: false, msg: 'error inesperado' })
    })
}

exports.confirmAppointment = (req, res, next) => {
  UserVaccines.findByIdAndUpdate({ _id: req.params.vaccine_id }, req.body, {
    upsert: true,
  })
    .then((vaccine) => {
      if (vaccine) {
        User.findById({ _id: vaccine.userId }).then((u) => {
          console.log(vaccine)
          console.log(req.body)
          if (req.body.dateConfirmed != 0)
            sendEmail(
              u.email,
              vaccine.vaccineId,
              req.body.dateConfirmed,
              'Confirmado'
            )
          else
            sendEmail(
              u.email,
              vaccine.vaccineId,
              req.body.dateApplied,
              'Aplicado'
            )
          res.status(200).json({ success: true, msg: vaccine })
        })
      } else
        return res
          .status(401)
          .json({ success: false, msg: 'no se encontro la vacuna' })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({ success: false, msg: 'error inesperado' })
    })
}
const sendEmail = (email, vacuna, fecha, estado) => {
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
    subject: 'Vacunassist - Turno',
    text: `Vacuna:${vacuna}, Fecha:${formatDate(
      new Date(fecha)
    )}, Estado:${estado}`,
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Email enviado ' + info.response)
    }
  })
}
const formatDate = (d) => {
  let y = d.getFullYear()
  let m = d.getMonth() + 1
  let day = d.getDate()
  return `${day}/${m}/${y}`
}
