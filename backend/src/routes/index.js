const router = require('express').Router()
router.use('/users', require('./user.routes'))
router.use('/articles', require('./article.routes'))
router.use('/usersVaccines', require('./userVaccines.routes'))
router.use('/sites', require('./sites.routes'))
module.exports = router
