const Site = require('../models/Site')

exports.getSites = (req, res, next) => {
  Site.find({})
    .then((sites) => {
      if (sites) {
        res.status(200).json(sites)
      } else
        res.status(401).json({ success: false, msg: 'No se encontraron sedes' })
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: 'Error inesperado', err })
    })
}

exports.uploadSite = (req, res, next) => {
  Site.findOne({ name: req.body.sedeName })
    .then((site) => {
      if (!site) {
        const newSite = new Site({
          name: req.body.sedeName,
        })
        newSite
          .save()
          .then((site) => {
            res.status(200).json(site)
          })
          .catch((err) => {
            res
              .status(500)
              .json({ success: false, msg: 'no se pudo guardar la sede', site })
          })
      } else res.status(409).json({ success: false, msg: 'sede ya existente' })
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: 'no se pudo encontrar la sede' })
    })
}

exports.deleteSite = (req, res, next) => {
  Site.findOneAndDelete({ name: req.params.site_id })
    .then((site) => {
      res.status(200).json({ success: true, msg: 'sede eliminada', site })
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: 'no se pudo encontrar la sede',err })
    })
}
