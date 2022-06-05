const router = require('express').Router()
const sitesCtrl = require('../controllers/sites.controller')

router.get('/',sitesCtrl.getSites)
router.post('/',sitesCtrl.uploadSite)
router.delete('/:site_id',sitesCtrl.deleteSite)

module.exports=router
