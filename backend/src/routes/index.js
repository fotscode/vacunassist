const router = require('express').Router()
router.use('/users', require('./user.routes'))
router.use('/articles', require('./article.routes'))
router.use('/usersVaccines', require('./userVaccines.routes'))
module.exports = router
